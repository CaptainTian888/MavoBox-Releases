import {t,lang,initLanguage} from '/i18n.js';
const $=id=>document.getElementById(id);
let state=null,message='',busy=false;
function notify(key){message=key;$('admin-message').textContent=t(key);}
async function api(path,method='GET',data){
  const response=await fetch(`/api/admin/${path}`,{method,headers:method==='GET'?{}:{'Content-Type':'application/json'},...(data!==undefined?{body:JSON.stringify(data)}:{})});
  const result=await response.json();
  if(!response.ok){if(response.status===401){state=null;render();}throw new Error(result.error || 'service_unavailable');}return result;
}
function cell(row,text){const c=document.createElement('td');c.textContent=text ?? '';row.append(c);return c;}
function date(value){return value?new Date(value).toLocaleString(lang()):'—';}
async function copy(text){try{await navigator.clipboard.writeText(text);notify('copied');}catch{notify('copyFailed');}}
function render(){
  $('login-form').hidden=!!state;$('dashboard').hidden=!state;$('logout').hidden=!state;$('admin-message').textContent=message?t(message):'';
  if(!state)return;
  $('today-total').textContent=`${state.today.day} · ${state.today.count} / ${state.daily_limit}`;
  const body=$('codes-body');body.replaceChildren();const filter=$('filter').value;
  const codes=state.codes.filter(c=>filter==='all'||(filter==='used'?!!c.used_at:!c.used_at));
  for(const c of codes){
    const row=document.createElement('tr');cell(row,c.code);cell(row,c.note);cell(row,date(c.created_at));cell(row,c.used_at?`${date(c.used_at)} · ${c.used_platform}`:t('unused'));
    const actions=cell(row,'');const cp=document.createElement('button');cp.type='button';cp.textContent=t('copy');cp.addEventListener('click',()=>copy(c.code));actions.append(cp);
    if(!c.used_at){const del=document.createElement('button');del.type='button';del.textContent=t('remove');del.addEventListener('click',()=>act(async()=>{await api(`codes/${encodeURIComponent(c.code)}`,'DELETE');await refresh();}));actions.append(del);}body.append(row);
  }
  if(!codes.length){const row=document.createElement('tr');cell(row,t('empty')).colSpan=5;body.append(row);}
  const history=$('history-body');history.replaceChildren();const counts=new Map(state.history.map(h=>[h.day,h.count]));
  for(let i=0;i<14;i++){const d=new Date(`${state.today.day}T00:00:00Z`);d.setUTCDate(d.getUTCDate()-i);const day=d.toISOString().slice(0,10);const row=document.createElement('tr');cell(row,day);cell(row,String(counts.get(day)||0));history.append(row);}
}
async function refresh(){state=await api('state');$('daily-limit').value=state.daily_limit;render();}
async function act(fn){if(busy)return;busy=true;document.querySelectorAll('button').forEach(b=>b.disabled=true);try{await fn();}catch(e){notify(t(e.message)===e.message?'service_unavailable':e.message);}finally{busy=false;document.querySelectorAll('button').forEach(b=>b.disabled=false);}}
initLanguage(render);
$('login-form').addEventListener('submit',e=>{e.preventDefault();act(async()=>{try{await api('login','POST',{password:$('password').value});message='';await refresh();}finally{$('password').value='';}});});
$('logout').addEventListener('click',()=>act(async()=>{await api('logout','POST',{});state=null;message='';$('generated-codes').value='';$('generated-codes').hidden=true;render();}));
$('settings-form').addEventListener('submit',e=>{e.preventDefault();act(async()=>{await api('settings','PUT',{daily_limit:Number($('daily-limit').value)});await refresh();notify('saved');});});
$('generate-form').addEventListener('submit',e=>{e.preventDefault();act(async()=>{const result=await api('codes','POST',{count:Number($('code-count').value),note:$('code-note').value});$('generated-codes').value=result.codes.join('\n');$('generated-codes').hidden=false;await refresh();notify('saved');});});
$('filter').addEventListener('change',render);
$('copy-unused').addEventListener('click',()=>copy(state.codes.filter(c=>!c.used_at).map(c=>c.code).join('\n')));
act(async()=>{try{await refresh();}catch(e){if(e.message!=='unauthorized')throw e;}});
