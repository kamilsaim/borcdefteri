# Borç Defteri

Tek dosyalık, framework'süz bir borç/alacak takip uygulaması. Tüm uygulama `borc-defteri.html` içinde (HTML + CSS + vanilla JS, tek `<script>` bloğu).

## Çalıştırma

Derleme adımı yok. `borc-defteri.html` dosyasını doğrudan tarayıcıda açmak yeterli.

## Mimari

- **Store katmanı** (`Store` nesnesi, script başında): veri kalıcılığı için tek nokta. Şu an `localStorage` kullanıyor. İleride Google giriş + Supabase eklenirse sadece `Store.load`/`Store.save` değişecek — kodun geri kalanı `state` nesnesiyle çalışır, kalıcılık detayını bilmez.
- **State**: `state = { settings, people, debts, payments }`. Her değişiklikten sonra `await Store.save(state)` çağrılır.
- **Görünümler (views)**: `.view` class'lı `<section>` elemanları (`ozet`, `aylik`, `kisiler`, `detay`, `ayarlar`). `show(tab)` aktif view'i değiştirir ve `render()` çağırır. `render()` sadece aktif tab'a ait render fonksiyonunu çalıştırır (`renderOzet`, `renderAylik`, `renderKisiler`, `renderDetay`).
- **Popup'lar**: `.overlay` > `.sheet` yapısı, ekranın ortasında modal olarak açılır (`openSheet`/`closeSheets`). Arka plana tıklamak popup'ı kapatır.
- **Onay penceresi**: Native `confirm()` kullanılmıyor — `askConfirm(msg)` (Promise tabanlı) uygulamanın kendi temasına uygun bir modal açar. Silme gibi geri alınamaz işlemlerde her zaman `await askConfirm(...)` kullanılmalı.

## Borç/ödeme mantığı

- Kart taksitleri kesim günü + ödeme günü ayarlarına göre hesaplanır (`firstDueDate`, `addMonths`, `schedule`).
- Ödemeler FIFO mantığıyla en eski açık kaleme düşülür (`personItems`). Fazla ödeme "credit" olarak sonraki borca devreder.
- Para birimi formatlama: `TL()`. Tarihler ISO string (`YYYY-MM-DD`) olarak saklanır, `parseISO`/`iso`/`fmtDate`/`fmtShort` ile dönüştürülür.

## Konvansiyonlar

- Yorum satırı bırakmadan önce: kod zaten okunaklı isimlerle yazılıyor, sadece "neden" açıklaması gereken yerlerde (örn. taksit tarihi hesaplama mantığı) yorum var.
- Yeni silme/geri alınamaz işlem eklerken native `confirm()`/`alert()` yerine mevcut `askConfirm()` desenini kullan.
- Yeni popup eklerken mevcut `.overlay > .sheet` yapısını ve `openSheet`/`closeSheets` fonksiyonlarını kullan.
