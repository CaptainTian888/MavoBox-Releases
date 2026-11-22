import {t,lang,initLanguage} from './i18n.js';
const $=id=>document.getElementById(id);
// Scroll-reveal: content is visible without JS; only hide-then-reveal once JS and IntersectionObserver are available.
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('js');
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
if($('year'))$('year').textContent=String(new Date().getFullYear());
let latest=null,open=false,message='',pending=false;
function render(){
  $('release-info').textContent=latest?.version ? `${latest.version} · ${latest.published_at ? new Date(latest.published_at).toLocaleDateString(lang()):''}` : t(latest ? 'noRelease':'loading');
  $('download-message').textContent=message ? t(message):(!open && latest?.version ? t('closed'):'');
  $('redeem-button').disabled=pending || !open || !latest?.version || !Object.values(latest.platforms || {}).some(Boolean);
  $('redeem-button').textContent=t(pending?'busy':'getDownload');
}
initLanguage(render);
async function load(){
  try {
    const [r,s]=await Promise.all([fetch('/api/release'),fetch('/api/status')]);
    if(!r.ok || !s.ok) throw new Error();
    latest=await r.json();open=(await s.json()).open;
    const choices=[...document.querySelectorAll('[name=platform]')];
    choices.forEach(input=>input.disabled=!latest.platforms?.[input.value]);
    if(!choices.some(i=>i.checked && !i.disabled)){const first=choices.find(i=>!i.disabled);if(first)first.checked=true;}
    $('release-notes').textContent=latest.notes || '';$('release-details').hidden=!latest.notes;
  }catch{message='service_unavailable';}render();
}
$('invite-code').addEventListener('input',e=>{const raw=e.target.value.toUpperCase().replace(/[\s-]/g,'').slice(0,12);e.target.value=raw.match(/.{1,4}/g)?.join('-') || '';});
$('download-form').addEventListener('submit',async e=>{
  e.preventDefault();if(pending)return;pending=true;message='';render();
  try{
    const platform=document.querySelector('[name=platform]:checked')?.value;
    const response=await fetch('/api/redeem',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:$('invite-code').value,platform})});
    const data=await response.json();
    if(!response.ok){message=data.error || 'service_unavailable';if(message==='limit_reached')open=false;}
    else{$('retry-link').href=data.url;$('retry-link').hidden=false;window.location.assign(data.url);}
  }catch{message='service_unavailable';}finally{pending=false;render();}
});
load();
