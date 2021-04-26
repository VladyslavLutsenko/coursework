self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
        .then(cache => {
            console.log('precaching');
            cache.add('/index.html');
            cache.add('/js/app.js');
            cache.add('/brands/visa-colored.svg');
            cache.add('/brands/master-card-colored.svg');
            cache.add('/brands/american-express-colored.svg');
        })
    )
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching something ....', event);
    event.respondWith(
        caches.match(event.request)
        .then(response =>{
            if (response) {
                /* console.log("from cache " + event.request.url); */
                return response;
            }
            else{
                return fetch(event.request);
            }
        })
        
    );
});
 