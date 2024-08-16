'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"index.html": "2ff8d9589017d977af6c37c24ce56580",
"/": "2ff8d9589017d977af6c37c24ce56580",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"manifest.json": "82b78769398125d2aa531104e175f0a2",
"favicon.ico": "31e84004b6ec38f255c707a0508943e9",
"flutter_bootstrap.js": "2bf7e42bceb86de1b641b7b99487c8e4",
"favicon-16x16.png": "c469dcb70b732afcf88f6e1afce20185",
"icons/android-chrome-512x512.png": "155897bd8daf3f50d059c39439d2bf19",
"icons/android-chrome-192x192.png": "62a6c1ac3476864e61d3388af1f07781",
"icons/apple-touch-icon.png": "d25e81243e1ac0d388b8759f49f1349c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/NOTICES": "1882904139ec4649447a2dc8c188c7e7",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.json": "f1f86db96e127a685dd1b8869e1d9c02",
"assets/assets/images/me.png": "86df89bc4bdae26b368dc20dab208b75",
"assets/assets/images/project_dummy.png": "48ac7bb6f8dc58d2921202760f584bff",
"assets/assets/images/current_company_logo.jpg": "8dcb281a58754d76c47bb601c606ce75",
"assets/assets/images/current_company_logo.png": "51a28d4f0b03d65c15941dfb8b77af4f",
"assets/assets/svgs/linkedin.svg": "86a3119b9297bdae9e33f638c3fa3f5b",
"assets/assets/svgs/dart.svg": "66ae16e4f84c52e20be06487c79dc315",
"assets/assets/svgs/kotlin.svg": "3b260b58b65460b12db02df819d3f4d8",
"assets/assets/svgs/git.svg": "d0cfff3b6216fa39d5382edcfdbf8ff1",
"assets/assets/svgs/flutter.svg": "2f5f283115c0bff42f0322995bbcdcba",
"assets/assets/svgs/github.svg": "07f7bbed8a4c995ab3405aab7a73134a",
"assets/assets/svgs/gmail.svg": "9f9e82d8fa81b89d9734f8f644639cc8",
"assets/assets/svgs/postgresql.svg": "b44dcbdd1baafa9630e96609a8c169e5",
"assets/assets/svgs/codeforces.svg": "ebcddf5cfd13e556957640bbf6e8ba38",
"assets/assets/svgs/go.svg": "143e13ce6efec9ca1f3eac73527d257d",
"assets/assets/svgs/firebase.svg": "87f1e06e861567e01dba866ba303b16f",
"assets/assets/svgs/android-studio.svg": "55baf59aaeca4d3795574d820b2891bc",
"assets/assets/svgs/leetcode.svg": "445ef95a3609dfc3d5d51dcbd21ac9f5",
"assets/assets/svgs/vscode.svg": "6a0600af926c4affdc66d97faa950408",
"assets/assets/svgs/sql.svg": "f4a5a9e039b4604010b8f56151148993",
"assets/assets/svgs/android.svg": "280317077d8e7c6b42d270789a92c9b5",
"assets/assets/svgs/c++.svg": "5d9991636ff1f2a31be088e3eeb87b08",
"assets/assets/svgs/google-cloud.svg": "941baa58f3fac509f65909c74eff723e",
"assets/AssetManifest.bin.json": "6e0b2607bccad28b624c3c97624ff0dc",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin": "7bdab4e4485f844929fcbb3c2f68f6aa",
"assets/fonts/MaterialIcons-Regular.otf": "80defc83173128ca4bc08c2dcf6df8cb",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"main.dart.js": "285af3ddc029d2c8d1138a3a0a50512e",
"favicon-32x32.png": "6f013e27bc327753f489dd863f8b3a2d",
"version.json": "009c9e65172e010890f7f65fde438006"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
