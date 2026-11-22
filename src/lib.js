export const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export function normalizeCode(value) { return typeof value === 'string' ? value.toUpperCase().replace(/[\s-]/g, '') : ''; }
export function formatCode(value) { return normalizeCode(value).match(/.{1,4}/g)?.join('-') || ''; }
export function generateCode() {
  let code = '';
  const ceiling = 256 - (256 % ALPHABET.length);
  while (code.length < 12) {
    for (const byte of crypto.getRandomValues(new Uint8Array(24))) {
      if (byte < ceiling) code += ALPHABET[byte % ALPHABET.length];
      if (code.length === 12) break;
    }
  }
  return code;
}
export function dayKey(date, offsetMin = 480) { return new Date(new Date(date).getTime() + Number(offsetMin) * 60000).toISOString().slice(0, 10); }
export function pickAsset(assets, platform) {
  const list = (Array.isArray(assets) ? assets : []).filter(a => typeof a.name === 'string');
  if (platform === 'win') return list.filter(a => /\.exe$/i.test(a.name)).sort((a,b) => Number(/setup/i.test(b.name)) - Number(/setup/i.test(a.name)))[0] || null;
  if (platform === 'mac') return list.find(a => /\.dmg$/i.test(a.name)) || null;
  return null;
}
const encoder = new TextEncoder();
async function key(secret) { return crypto.subtle.importKey('raw', encoder.encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['sign','verify']); }
export async function sign(secret, message) { return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC', await key(secret), encoder.encode(message))), b => b.toString(16).padStart(2,'0')).join(''); }
export async function verify(secret, message, signature) {
  if (typeof signature !== 'string' || !/^[a-f0-9]{64}$/.test(signature)) return false;
  return crypto.subtle.verify('HMAC', await key(secret), Uint8Array.from(signature.match(/../g), h => parseInt(h,16)), encoder.encode(message));
}
export async function signDownload(secret, platform, exp) { return sign(secret, `${platform}|${exp}`); }
export async function verifyDownload(secret, platform, exp, signature, now = Math.floor(Date.now()/1000)) {
  return ['win','mac'].includes(platform) && /^\d+$/.test(String(exp)) && Number.isSafeInteger(Number(exp)) && Number(exp) > now && verify(secret, `${platform}|${exp}`, signature);
}
