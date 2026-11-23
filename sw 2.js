const C='dsv-v1',HOSTS=['cdn.jsdelivr.net','storage.googleapis.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||!(u.origin===location.origin||HOSTS.includes(u.hostname)))return;
 e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(r);
  const net=fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x}).catch(()=>hit);
  return u.origin===location.origin?net.then(x=>x||hit):(hit||net)}))});
