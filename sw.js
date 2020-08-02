const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
  "/",
  "/products",
  "/admin/products-management",
  "/admin/addons-management",
  "/admin/allergies-management",
  // "/user/cart",
  // "/user/order",
  // "/about",
  // "/terms",
  "/ip7.png",
  "/shopping-cart.png",
  "/oops",
  "/mobile.css",
  "/global.css",
  "/navbar_mobile.css",
  "/tablet_portrait.css",
  "/materialize.css",
  "/admin_ui/admin.js",
  "/customer_ui/customer.js",
  "/materialize.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/Poppins-Regular.ttf",
  "https://kit.fontawesome.com/2cea744347.js",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
];

// cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// service worker install event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        console.log("Creating cache");
        cache.addAll(assets);
      })
      .catch((err) => console.log(err))
  );
});

// service worker activated event
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch request
self.addEventListener("fetch", (e) => {
  const regex = /http:\/\/localhost:4000\/[user]\/*\/*/;
  e.respondWith(
    caches
      .match(e.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(e.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(e.request.url, fetchRes.clone());
              limitCacheSize(dynamicCache, 3);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (!e.request.url.includes(".")) {
          return caches.match("/oops");
        }
      })
  );
});
