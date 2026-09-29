const CACHE='ruh-yasmin-retired-v21';
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('ruh-yasmin-')).map(k=>caches.delete(k)));
    await self.registration.unregister();
  })());
});
self.addEventListener('fetch',()=>{});