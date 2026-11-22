import {normalizeCode, formatCode, generateCode, dayKey, pickAsset, sign, verify, signDownload, verifyDownload} from './lib.js';
const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {status,headers:{'Content-Type':'application/json; charset=utf-8',...headers}});
const error = (code,status) => json({error:code},status);
const configured = env => [env.ADMIN_PASSWORD,env.SESSION_SECRET].every(s => typeof s === 'string' && s.length >= 12);
const today = env => dayKey(new Date(), Number(env.TIMEZONE_OFFSET_MINUTES ?? 480));
const changes = r => Number(r.meta?.changes || 0);
async function release(env,ctx) {
  const url = `https://api.github.com/repos/${env.RELEASES_REPO}/releases/latest`;
  const cache = caches.default;
  const cached = await cache.match(url);
  if (cached) return cached.json();
  const response = await fetch(url,{headers:{'User-Agent':'mavobox-site','Accept':'application/vnd.github+json'}});
  if (response.status !== 404 && !response.ok) throw new Error('release_unavailable');
  const result = response.status === 404 ? null : await response.json();
  ctx.waitUntil(cache.put(url,json(result,200,{'Cache-Control':'public, max-age=600'})));
  return result;
}
async function quota(env) {
  return env.DB.prepare("SELECT CAST(value AS INTEGER) AS daily_limit, COALESCE((SELECT count FROM daily_downloads WHERE day=?),0) AS count FROM settings WHERE key='daily_limit'").bind(today(env)).first();
}
async function body(request) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('Content-Type') || '')) throw new Error('invalid_input');
  const value = await request.json();
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid_input');
  return value;
}
async function authorized(request,env) {
  const token = request.headers.get('Cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith('mb_admin='))?.slice(9);
  const match = token?.match(/^(\d+)\.([a-f0-9]{64})$/);
  return !!match && Number(match[1]) > Date.now()/1000 && await verify(env.SESSION_SECRET,`admin|${match[1]}`,match[2]);
}
async function login(request,env) {
  const data = await body(request);
  if (typeof data.password !== 'string' || data.password.length > 4096) return error('invalid_input',400);
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const now = Math.floor(Date.now()/1000);
  const attempt = await env.DB.prepare('SELECT failures, window_start FROM login_attempts WHERE ip=?').bind(ip).first();
  if (attempt && now - attempt.window_start < 900 && attempt.failures >= 5) return error('too_many_attempts',429);
  // Compare fixed-size HMACs using Web Crypto's verification primitive.
  const expected = await sign(env.SESSION_SECRET, data.password);
  if (!await verify(env.SESSION_SECRET,env.ADMIN_PASSWORD,expected)) {
    const result = await env.DB.prepare(`INSERT INTO login_attempts(ip,failures,window_start) VALUES (?,1,?) ON CONFLICT(ip) DO UPDATE SET failures=CASE WHEN ?-window_start>=900 THEN 1 ELSE failures+1 END, window_start=CASE WHEN ?-window_start>=900 THEN ? ELSE window_start END RETURNING failures`).bind(ip,now,now,now,now).first();
    return error(result.failures >= 5 ? 'too_many_attempts':'unauthorized', result.failures >= 5 ? 429:401);
  }
  await env.DB.prepare('DELETE FROM login_attempts WHERE ip=?').bind(ip).run();
  const exp = now + 43200;
  return json({ok:true},200,{'Set-Cookie':`mb_admin=${exp}.${await sign(env.SESSION_SECRET,`admin|${exp}`)}; Max-Age=43200; HttpOnly; Secure; SameSite=Strict; Path=/`});
}
async function redeem(request,env,ctx) {
  const {code:input,platform} = await body(request);
  const code = normalizeCode(input);
  if (!/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{12}$/.test(code) || !['win','mac'].includes(platform)) return error('invalid_input',400);
  const latest = await release(env,ctx);
  if (!latest) return error('no_release',404);
  if (!pickAsset(latest.assets,platform)) return error('no_asset',404);
  const now = new Date().toISOString(), day = today(env);
  const result = await env.DB.batch([
    env.DB.prepare("UPDATE invite_codes SET used_at=?, used_platform=? WHERE code=? AND used_at IS NULL AND COALESCE((SELECT count FROM daily_downloads WHERE day=?),0) < CAST((SELECT value FROM settings WHERE key='daily_limit') AS INTEGER)").bind(now,platform,code,day),
    env.DB.prepare('INSERT INTO daily_downloads (day,count) SELECT ?,1 WHERE changes()=1 ON CONFLICT(day) DO UPDATE SET count=count+1').bind(day)
  ]);
  if (!changes(result[0])) {
    const existing = await env.DB.prepare('SELECT used_at FROM invite_codes WHERE code=?').bind(code).first();
    if (!existing) return error('invalid_code',404);
    if (existing.used_at) return error('code_used',409);
    return error('limit_reached',429);
  }
  const exp = Math.floor(Date.now()/1000)+3600;
  return json({url:`/api/download?p=${platform}&exp=${exp}&sig=${await signDownload(env.SESSION_SECRET,platform,exp)}`});
}
async function admin(request,env,url) {
  if (url.pathname === '/api/admin/login' && request.method === 'POST') return login(request,env);
  if (!await authorized(request,env)) return error('unauthorized',401);
  if (request.method !== 'GET' && !/^application\/json(?:\s*;|$)/i.test(request.headers.get('Content-Type') || '')) return error('invalid_input',400);
  if (url.pathname === '/api/admin/logout' && request.method === 'POST') return json({ok:true},200,{'Set-Cookie':'mb_admin=; Max-Age=0; HttpOnly; Secure; SameSite=Strict; Path=/'});
  if (url.pathname === '/api/admin/state' && request.method === 'GET') {
    const q = await quota(env), day = today(env);
    const codes = await env.DB.prepare('SELECT code,note,created_at,used_at,used_platform FROM invite_codes ORDER BY created_at DESC,code DESC LIMIT 500').all();
    const start = new Date(`${day}T00:00:00Z`); start.setUTCDate(start.getUTCDate()-13);
    const history = await env.DB.prepare('SELECT day,count FROM daily_downloads WHERE day>=? AND day<=? ORDER BY day DESC').bind(start.toISOString().slice(0,10),day).all();
    return json({daily_limit:q?.daily_limit ?? 0,today:{day,count:q?.count ?? 0},codes:codes.results.map(c=>({...c,code:formatCode(c.code)})),history:history.results});
  }
  if (url.pathname === '/api/admin/codes' && request.method === 'POST') {
    const {count,note=''} = await body(request);
    if (!Number.isInteger(count) || count<1 || count>100 || typeof note !== 'string' || note.length>100) return error('invalid_input',400);
    const codes = new Set(); while(codes.size<count) codes.add(generateCode());
    const created = new Date().toISOString();
    await env.DB.batch([...codes].map(c=>env.DB.prepare('INSERT INTO invite_codes(code,note,created_at) VALUES (?,?,?)').bind(c,note,created)));
    return json({codes:[...codes].map(formatCode)});
  }
  if (url.pathname.startsWith('/api/admin/codes/') && request.method === 'DELETE') {
    const code = normalizeCode(decodeURIComponent(url.pathname.slice('/api/admin/codes/'.length)));
    const result = await env.DB.prepare('DELETE FROM invite_codes WHERE code=? AND used_at IS NULL').bind(code).run();
    if (!changes(result)) {
      const found = await env.DB.prepare('SELECT code FROM invite_codes WHERE code=?').bind(code).first();
      return error(found ? 'code_used':'invalid_code',found ? 409:404);
    }
    return json({ok:true});
  }
  if (url.pathname === '/api/admin/settings' && request.method === 'PUT') {
    const {daily_limit} = await body(request);
    if (!Number.isInteger(daily_limit) || daily_limit<0 || daily_limit>100000) return error('invalid_input',400);
    await env.DB.prepare("UPDATE settings SET value=? WHERE key='daily_limit'").bind(String(daily_limit)).run();
    return json({ok:true});
  }
  return error('not_found',404);
}
async function route(request,env,ctx,url) {
  const path = url.pathname;
  if ((path.startsWith('/api/admin/') || path === '/api/redeem') && !configured(env)) return error('not_configured',500);
  if (path.startsWith('/api/admin/')) return admin(request,env,url);
  if (path === '/api/release' && request.method === 'GET') {
    const r = await release(env,ctx);
    return json(r ? {version:r.tag_name,published_at:r.published_at,notes:r.body || '',platforms:{win:!!pickAsset(r.assets,'win'),mac:!!pickAsset(r.assets,'mac')}} : {version:null});
  }
  if (path === '/api/status' && request.method === 'GET') { const q=await quota(env); return json({open:!!q && q.count<q.daily_limit}); }
  if (path === '/api/redeem' && request.method === 'POST') return redeem(request,env,ctx);
  if (path === '/api/download' && request.method === 'GET') {
    const p=url.searchParams.get('p'),exp=url.searchParams.get('exp'),sig=url.searchParams.get('sig');
    if (!configured(env) || !await verifyDownload(env.SESSION_SECRET,p,exp,sig)) return new Response('Invalid or expired download link.',{status:403});
    const r=await release(env,ctx),asset=pickAsset(r?.assets,p);
    if (!asset) return error(r ? 'no_asset':'no_release',404);
    return new Response(null,{status:302,headers:{Location:asset.browser_download_url}});
  }
  return error('not_found',404);
}
export default {async fetch(request,env,ctx) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
  let response;
  try { response=await route(request,env,ctx,url); }
  catch(e) { response=error(e.message==='invalid_input' || e instanceof SyntaxError ? 'invalid_input':'service_unavailable', e.message==='invalid_input' || e instanceof SyntaxError ? 400:503); }
  const headers = new Headers(response.headers);
  headers.set('Cache-Control','no-store'); headers.set('X-Content-Type-Options','nosniff');
  return new Response(response.body,{status:response.status,headers});
}};
