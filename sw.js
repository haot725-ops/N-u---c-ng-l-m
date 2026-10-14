const CACHE='nau-app-pwa-20261014-1';
const BASE=new URL('./',self.location.href);
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('nau-app-pwa-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==BASE.origin||!u.pathname.startsWith(BASE.pathname))return;e.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(e.request);if(cached)return cached;try{return await fetch(e.request);}catch(err){if(e.request.mode==='navigate')return cache.match(new URL('index.html',BASE).href);throw err;}})());});