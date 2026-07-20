<div align="center">
  <img src="logo2.png" alt="Borç Defteri logo" width="120" height="120">

  # Borç Defteri

  Alacak verecek borç takibi — tek dosyalık, framework'süz web uygulaması.

  **Sürüm 1.5.0**

  🔗 [kamilsaim.github.io/borcdefteri](https://kamilsaim.github.io/borcdefteri/)
</div>

## Özellikler

- Kişi bazlı borç/alacak takibi
- Kart taksitli alışveriş, nakit borç/alacak kayıtları
- Aylık görünüm: o aya ait taksit ve tek çekim kalemleri, ödenen/kalan tutarlar
- Kişi kartlarında gelecek 3 ay için ödeme tahmini
- Google hesabıyla giriş, Supabase üzerinden cihazlar arası gerçek zamanlı senkronizasyon
- Çevrimdışı çalışma ve otomatik yeniden senkronizasyon
- Yedek indirme / geri yükleme (JSON)

## Çalıştırma

Derleme adımı yok — `index.html` tek başına yeterli. Google girişi için dosyayı `file://` yerine bir yerel sunucu üzerinden (`http://localhost:...`) açmak gerekir.

## Teknoloji

- Vanilla HTML/CSS/JS (tek dosya)
- [Supabase](https://supabase.com) (Postgres + Auth + Realtime)
- GitHub Pages üzerinden yayın
