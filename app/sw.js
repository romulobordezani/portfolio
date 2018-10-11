self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v5.1').then(function(cache) {
            return cache.addAll([
                '/'
            ]);
        })
    );
});

caches.keys().then(function(names) {
  for (let name of names)
    caches.delete(name);
});


self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {

                if(!(event.request.url.indexOf('http') === 0)){
                    return response;
                }

                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v5.1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match('/images/favicons/favicon.png');
            });
        }
    }));
});

