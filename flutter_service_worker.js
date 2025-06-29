'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7bdab4e4485f844929fcbb3c2f68f6aa",
"assets/AssetManifest.bin.json": "6e0b2607bccad28b624c3c97624ff0dc",
"assets/AssetManifest.json": "f1f86db96e127a685dd1b8869e1d9c02",
"assets/assets/images/current_company_logo.jpg": "8dcb281a58754d76c47bb601c606ce75",
"assets/assets/images/current_company_logo.png": "51a28d4f0b03d65c15941dfb8b77af4f",
"assets/assets/images/me.png": "86df89bc4bdae26b368dc20dab208b75",
"assets/assets/images/project_dummy.png": "48ac7bb6f8dc58d2921202760f584bff",
"assets/assets/svgs/android-studio.svg": "55baf59aaeca4d3795574d820b2891bc",
"assets/assets/svgs/android.svg": "280317077d8e7c6b42d270789a92c9b5",
"assets/assets/svgs/c++.svg": "32b46edd78ce965812c8c31894f2b9da",
"assets/assets/svgs/codeforces.svg": "bf22a40724a098c8b194622993816299",
"assets/assets/svgs/dart.svg": "66ae16e4f84c52e20be06487c79dc315",
"assets/assets/svgs/firebase.svg": "87f1e06e861567e01dba866ba303b16f",
"assets/assets/svgs/flutter.svg": "2f5f283115c0bff42f0322995bbcdcba",
"assets/assets/svgs/git.svg": "d0cfff3b6216fa39d5382edcfdbf8ff1",
"assets/assets/svgs/github.svg": "f98b1ef0d954390d93cf926900474bdd",
"assets/assets/svgs/gmail.svg": "17c689ebdebc3e8c4e71ba61f2db534f",
"assets/assets/svgs/go.svg": "143e13ce6efec9ca1f3eac73527d257d",
"assets/assets/svgs/google-cloud.svg": "941baa58f3fac509f65909c74eff723e",
"assets/assets/svgs/kotlin.svg": "3b260b58b65460b12db02df819d3f4d8",
"assets/assets/svgs/leetcode.svg": "6cfe565c6dff64115c4aae11a73577af",
"assets/assets/svgs/linkedin.svg": "2ade8b03581ab1b384b76729dadc9963",
"assets/assets/svgs/postgresql.svg": "b44dcbdd1baafa9630e96609a8c169e5",
"assets/assets/svgs/sql.svg": "f4a5a9e039b4604010b8f56151148993",
"assets/assets/svgs/vscode.svg": "48a7cc548243dc7077d138ab318b0be2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "a2381de55f34e67987fa473a4cbf5f1e",
"assets/NOTICES": "bf4d0c3c59fbcc751eb9e1c71e9578ca",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon-16x16.png": "c469dcb70b732afcf88f6e1afce20185",
"favicon-32x32.png": "6f013e27bc327753f489dd863f8b3a2d",
"favicon.ico": "31e84004b6ec38f255c707a0508943e9",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "cabbd016e1994024fee6ba588c01440b",
"icons/android-chrome-192x192.png": "62a6c1ac3476864e61d3388af1f07781",
"icons/android-chrome-512x512.png": "155897bd8daf3f50d059c39439d2bf19",
"icons/apple-touch-icon.png": "d25e81243e1ac0d388b8759f49f1349c",
"index.html": "91020c7c320202bfd47d9be08d07e224",
"/": "91020c7c320202bfd47d9be08d07e224",
"main.dart.js": "ef8f95d2adfd74b2ef1c0aae812772b4",
"manifest.json": "c5350020534ae7cc579c955a22a11e54",
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
