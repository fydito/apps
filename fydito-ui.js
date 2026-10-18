/* Navegación y tema unificados para Apps de Fydito */
(function(){
'use strict';
const root=document.documentElement, body=document.body;
const existingTheme=document.querySelector('#themeToggle:not([data-fydito-global]),#themeBtn,#theme-toggle,#theme:not([data-fydito-global])');
const backCandidates=[...document.querySelectorAll('a,button')].filter(el=>/Apps de Fydito|← Apps|Volver a aplicaciones/i.test((el.textContent||'').trim()) && !el.closest('#fydito-global-nav'));
const bar=document.createElement('nav');bar.id='fydito-global-nav';bar.setAttribute('aria-label','Navegación de aplicaciones');
bar.innerHTML='<a href="../" aria-label="Volver a Apps de Fydito">← Apps de Fydito</a><button type="button" data-fydito-global aria-label="Cambiar entre modo claro y oscuro" title="Cambiar tema"></button>';
body.insertBefore(bar,body.firstChild);
const button=bar.querySelector('button');
for(const el of backCandidates){if(el.closest('header')||el.id==='volver'||el.classList.contains('back')||el.classList.contains('home'))el.style.display='none';}
if(existingTheme)existingTheme.style.display='none';
function getSaved(){try{return localStorage.getItem('fydito-theme')||localStorage.getItem('fydito_theme')||'light'}catch(e){return 'light'}}
function setTheme(mode){
 const dark=mode==='dark';root.dataset.theme=mode;root.dataset.embedTheme=mode;
 body.classList.toggle('dark',dark);body.classList.toggle('dark-theme',dark);body.classList.toggle('light-theme',!dark);
 root.style.setProperty('--fydito-nav-theme',mode);
 button.textContent=dark?'☀':'☾';button.title=dark?'Modo claro':'Modo oscuro';
 try{for(const key of ['fydito-theme','fydito_theme','fyditoAppsTheme','fydito-pdf-theme'])localStorage.setItem(key,mode)}catch(e){}
 // Las aplicaciones embebidas, como la radio, reciben el mismo tema.
 document.querySelectorAll('iframe').forEach(frame=>{try{frame.contentWindow.postMessage({type:'fydito-theme',theme:mode},location.origin)}catch(e){}});
}
setTheme(getSaved());
button.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
// Algunas aplicaciones inicializan su tema al final del documento.
window.addEventListener('load',()=>setTheme(getSaved()),{once:true});
})();
