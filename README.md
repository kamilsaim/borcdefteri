<div align="center">

<img src="logo.png" alt="Borç Defteri logo" width="160">

# Borç Defteri

**Alacak · Verecek · Borç Takibi**

Kimden ne alacağınızı, kime ne borcunuz olduğunu, kart taksitlerini ve
ödemeleri tek bir dosyada takip edin — hesabınıza bağlı bulut senkronu ve
çevrimdışı çalışma ile.

![Sürüm](https://img.shields.io/badge/s%C3%BCr%C3%BCm-v1.10.0-2E7D5B)
![Platform](https://img.shields.io/badge/platform-Web%20%C2%B7%20PWA-2E7D5B)
![Yapı](https://img.shields.io/badge/yap%C4%B1-tek%20dosya%20HTML-0F1512)

</div>

---

## ✨ Özellikler

### 🤝 Borç / Alacak Takibi
- **Kişi bazlı** alacak ve verecek kaydı — herkesin durumu tek bakışta
- Kart **taksitli alışveriş** ve **nakit** borç/alacak kayıtları
- **Kısmi ödeme takibi**: her kayda birden çok ödeme eklenebilir, kalan bakiye otomatik hesaplanır (FIFO — en eski açık kalem önce kapanır, fazla ödeme sonraki borca devreder)
- Kayıtları **düzenleme** — kişi, tutar ve tarih sonradan değiştirilebilir
- Silme gibi geri alınamaz işlemler **uygulama içi onay penceresiyle** yapılır (tarayıcı popup'u değil)

### 💳 Çoklu Kart
- Birden fazla kredi kartı tanımlayın, **her kartın kendi kesim ve son ödeme günü** olsun
- Taksitli alışverişte kart seçilir, ilk taksit vadesi o kartın günlerine göre otomatik hesaplanır

### 📅 Aylık Görünüm
- Seçili aya ait **taksit/nakit** ve **tek çekim** kalemleri ayrı listelerde
- O aya ait **Alacağım / Borcum** toplamları ile **Ödenen / Kalan** dökümü
- Kalan tutarlar üzerinden genel **net durum**

### 👥 Kişiler
- Her kişi kartında bu ay + sonraki **2 ay için ödeme tahmini** küçük etiketler halinde
- Kişi detayında borçlar "Borçlar & Taksitler" ve "Tek Çekimler" olarak ayrılır, tam plan dökümüyle
- Kişi kartları **basılı tutup sürükleyerek** istediğiniz sıraya dizilir, sıralama cihazlar arası senkronlanır
- **📤 Özet kart**: kişinin güncel durumunu (kalemler, ödenen, kalan, geciken, yaklaşan aylar) görsel bir kart olarak üretip WhatsApp vb. ile kendisine gönderin — karşı tarafın uygulamaya ihtiyacı yok

### ⇄ Paylaşılan Hesaplar
- Bir kişi kartını **o kişinin kendi hesabıyla paylaşın** — karşı taraf hesabı kendi perspektifinden (**aynalanmış**) görür
- Üç kademeli yetki: **Görüntüleyen** (sadece görür) · **Katılımcı** (ödeme ekler, kendi eklediğini düzenler) · **Tam yetki** (borç ve ödeme ekler, düzenler)
- **Davet + kabul**: karşı taraf kabul edene kadar hiçbir veri görünmez; hazır davet mesajı WhatsApp'tan gönderilebilir
- Karşı tarafın eklediği kayıtlar **"onay bekliyor"** işaretiyle görünür, tek dokunuşla onaylanır
- Paylaşılan hesaplar isteğe bağlı olarak genel toplamlara dahil edilebilir (varsayılan kapalı)

### 🔔 Bildirimler
- Paylaşılan hesaptaki hareketler ve gelen davetler için **anlık bildirim** (Android uygulaması ve tarayıcı/iOS)
- Bildirim işlemi yapan kişiye gönderilmez, yalnızca karşı tarafa gider

### 🎨 Görünüm
- **Açık / Koyu / Sistem** tema seçimi — seçim hesaba bağlıdır, hangi cihazdan girerseniz girin aynı tema açılır

### ☁️ Bulut Senkronu
- **Google ile giriş**: veriler Supabase'de, yalnızca size ait kayıtlar olarak saklanır
- **Cihazlar arası gerçek zamanlı senkron**: başka cihaz/sekmedeki değişiklik kısa sürede görünür
- **Çevrimdışı çalışma**: bağlantı yokken kayıt eklemeye devam edin — veri cihazda bekler, bağlantı gelince otomatik gönderilir ve hiçbir koşulda sunucudaki eski kopyayla ezilmez
- **Gönderilmemiş kayıt uyarısı**: bekleyen kayıt varken üstte uyarı şeridi ve "Şimdi gönder" düğmesi çıkar, bekleyen satırlar ⏳ ile işaretlenir
- Veri tutarlılığı için **bağlantı yokken silme yapılamaz** (ekleme ve düzenleme serbesttir)
- Ayarlar'da ayrıca senkron durumu gösterilir (Senkronize / Bekleyen değişiklik / Çevrimdışı)

### 💾 Diğer
- JSON **yedek indirme / geri yükleme**
- Ana ekrana eklenebilir **PWA** (favicon + apple-touch-icon)
- Ayarlar'dan **hesabınızı ve tüm verilerinizi** uygulama içinden kalıcı olarak silebilirsiniz

## 📱 Kurulum

Uygulama tek bir HTML dosyasıdır, kurulum gerektirmez:

1. [kamilsaim.github.io/borcdefteri](https://kamilsaim.github.io/borcdefteri/) adresini açın (veya `index.html` dosyasını yerel sunucuyla)
2. Tarayıcı menüsünden **"Ana ekrana ekle"** deyin
3. Artık uygulama gibi tam ekran açılır ✅

> 💡 Uygulama **Google girişi** ile açılır (veriler hesabınıza bağlı olarak senkronlanır). Bu yüzden dosyayı `file://` yerine bir yerel sunucu (`http://localhost:...`) veya GitHub Pages üzerinden açmak gerekir; OAuth `file://` üzerinde çalışmaz.

## 🔒 Gizlilik

Uygulama Google girişiyle çalışır; verileriniz Supabase'de **yalnızca sizin
erişebileceğiniz** şekilde (Row Level Security ile korunan, hesabınıza bağlı kayıtlar)
saklanır ve çevrimdışı kullanım için ayrıca cihazınızda (`localStorage`) tutulur.
Paylaşılan hesaplarda yalnızca **sizin paylaştığınız kişi kartı** karşı tarafa açılır.
**Reklam yok, takip yok.** Hesabınızı ve tüm verilerinizi Ayarlar'dan kendiniz
silebilirsiniz.

## 🛠️ Teknik

| | |
|---|---|
| Yapı | Tek dosya HTML + CSS + JS, framework yok |
| Depolama | Supabase (birincil) + `localStorage` çevrimdışı önbellek, JSON yedekleme ile taşınabilir |
| Bulut senkronu | [Supabase](https://supabase.com) — Postgres + Auth + Realtime (Google girişiyle) |
| Yayın | GitHub Pages |

## 📋 Sürüm Geçmişi

| Sürüm | Yenilikler |
|---|---|
| **v1.10.0** | **Özet kart**: kişi detayından o kişinin durumunu PNG kart olarak üretip paylaşma |
| **v1.9.0** | **Çevrimdışı görünürlüğü**: gönderilmemiş kayıt varken üstte uyarı şeridi ve "Şimdi gönder" düğmesi, bekleyen satırlarda ⏳ işareti; bağlantı yokken silme engellenir; çevrimdışı yapılan silmeler artık bağlantı gelince gönderilir; çıkışta bekleyen kayıt uyarısı |
| **v1.8.1** | Gönderilemeyen (senkronlanmamış) kayıtların, uygulama yeniden açıldığında sunucudaki eski veriyle ezilerek kaybolması düzeltildi; arka plana alınırken bekleyen kayıt için son bir gönderim denemesi eklendi |
| **v1.8.0** | **Açık Tema**: Ayarlar'dan Açık/Koyu/Sistem tema seçimi, hesaba bağlı olarak tüm cihazlara senkronlanır |
| **v1.7.4** | Uygulama tam kapatılıp açıldığında (özellikle iOS'ta) ağ henüz hazır olmadan yapılan bir kimlik doğrulama kontrolü başarısız olursa yerel verinin sıfırlanması düzeltildi |
| **v1.7.3** | Kısa aralıklarla art arda kayıt yapılırsa (biri gönderilirken diğeri kaydedilirse) ikinci kaydın sessizce kaybolabildiği durum düzeltildi |
| **v1.7.2** | Kaydettikten hemen sonra uygulama kapatılırsa senkronize olmamış verinin eski bulut kopyasıyla ezilip kaybolması düzeltildi |
| **v1.7.1** | **Bildirimler**: paylaşılan hesaptaki hareketler ve davetler için anlık bildirim (Android uygulaması + iOS/tarayıcı). Nakit borçlara isteğe bağlı son ödeme tarihi |
| **v1.7.0** | **Paylaşılan Hesaplar**: kişi kartını başka bir kullanıcıyla paylaşma, üç kademeli yetki, onay bekleyen kayıt işareti |
| **v1.6.2** | Tek çekimler tek bir "Tek Çekim" başlığı altında liste halinde gruplandı |
| **v1.6.1** | Yakınlaştırma kapatıldı, tek çekim görünümü taksit planıyla birleştirildi, + butonu/son satır çakışması düzeltildi |
| **v1.6.0** | Başkasının kartıyla taksit: arkadaşının kartıyla yapılan taksitli alışverişi kırmızı borç olarak ekleme |
| **v1.5.0** | Google giriş ekranına logo, Ayarlar'da program bilgisi ve oturum e-postası, aylık görünümde ödenen/kalan tutar, favicon ve yeni logo |
| **v1.x** | Kişi bazlı borç/alacak, kart taksitleri, kısmi ödeme takibi, aylık görünüm, bulut senkronu |

---

<div align="center">

🔗 [kamilsaim.github.io/borcdefteri](https://kamilsaim.github.io/borcdefteri/)

🌐 [kamilsaim.web.app](https://kamilsaim.web.app)

</div>
