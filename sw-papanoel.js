// Carta Mágica · Orden Dorado — instalar y abrir sin conexión
const C='papanoel-v2',F=['papanoel.html','papanoel.webmanifest','papanoel-192.png','papanoel-512.png','papanoel-trineo.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('papanoel-')&&x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||!F.some(f=>u.pathname.endsWith('/'+f)))return;
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
