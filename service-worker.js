const CACHE_NAME = "mahmoud-platform-v1";
const assets = ["index.html", "style.css", "script.js", "profile.png"];

// تثبيت التطبيق وتخزين الملفات الأساسية لسرعة الفتح
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// تشغيل التطبيق وجلب الملفات بسرعة صاروخية
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
