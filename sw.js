/* Borç Defteri service worker — yalnızca push bildirimi için.
   Sayfa GitHub Pages'te /borcdefteri/ altında yayınlandığı için Firebase'in
   varsayılan /firebase-messaging-sw.js yolu işe yaramaz; bu dosya index.html
   içinden göreli yolla kaydedilir ve getToken'a açıkça verilir. */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBF5UPLrDUIsAH-Fhp-CGtzc2-g8aF8odo',
  authDomain: 'kamilsaim.firebaseapp.com',
  projectId: 'kamilsaim',
  storageBucket: 'kamilsaim.firebasestorage.app',
  messagingSenderId: '981361653395',
  appId: '1:981361653395:web:5dead0e7dcad3c728fbf66'
});

firebase.messaging();

/* Bildirime tıklanınca: uygulama zaten açıksa o pencereye odaklan ve hangi
   kişiye gidileceğini bildir, değilse yeni pencere aç. */
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const personId = (event.notification.data && (event.notification.data.personId ||
                    (event.notification.data.FCM_MSG || {}).data?.personId)) || '';
  event.waitUntil((async () => {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of clientList) {
      if (c.url.includes('/borcdefteri') || c.url.includes('index.html')) {
        c.postMessage({ type: 'push-open', personId });
        return c.focus();
      }
    }
    return self.clients.openWindow('./index.html' + (personId ? '?person=' + personId : ''));
  })());
});
