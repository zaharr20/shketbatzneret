// Simple, cookie-free visit counter (Supabase). No names, no IPs stored.
(function(){
  var URL='https://psfnbgjccffjjzrctkde.supabase.co/rest/v1/shket_events';
  var KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZm5iZ2pjY2Zmamp6cmN0a2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MzQ3MTUsImV4cCI6MjA3MTAxMDcxNX0.HOC7mc8twB-R0Hi3vqJjePxggKiJBoX3NHglrq2k7Js';
  if(/^(localhost|127\.)/.test(location.hostname))return;
  var vid;
  try{vid=localStorage.getItem('sb_vid');if(!vid){vid=Math.random().toString(36).slice(2,12);localStorage.setItem('sb_vid',vid);}}catch(e){vid=null;}
  var q=new URLSearchParams(location.search);
  var ref='';try{ref=document.referrer?new URL(document.referrer).hostname:'';}catch(e){}
  var device=/Mobi|Android|iPhone/i.test(navigator.userAgent)?'mobile':'desktop';
  function send(event,label){
    var body={event:event,label:label?String(label).slice(0,60):null,path:(location.pathname+location.hash).slice(0,200),
      referrer:ref.slice(0,300)||null,utm_source:(q.get('utm_source')||'').slice(0,60)||null,device:device,visitor:vid};
    try{fetch(URL,{method:'POST',keepalive:true,headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(body)});}catch(e){}
  }
  send('view');
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href*="wa.me"]');
    if(a)send('whatsapp',(a.textContent.trim()||a.getAttribute('aria-label')||'').replace(/\s+/g,' '));
  },true);
})();
