<div align="center">

<img src="logo.png" alt="Borç Defteri logo" width="160">

# Borç Defteri

**Alacak · Verecek · Borç Takibi**

Kimden ne alacağınızı, kime ne borcunuz olduğunu, kart taksitlerini ve
ödemeleri tek bir dosyada takip edin — hepsi cihazınızda, isteğe bağlı bulut yedeğiyle.

![Sürüm](https://img.shields.io/badge/s%C3%BCr%C3%BCm-v1.7.4-2E7D5B)
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

### 📅 Aylık Görünüm
- Seçili aya ait **taksit/nakit** ve **tek çekim** kalemleri ayrı listelerde
- O aya ait **Alacağım / Borcum** toplamları ile **Ödenen / Kalan** dökümü
- Kalan tutarlar üzerinden genel **net durum**

### 👥 Kişiler
- Her kişi kartında bu ay + sonraki **2 ay için ödeme tahmini** küçük etiketler halinde
- Kişi detayında borçlar "Borçlar & Taksitler" ve "Tek Çekimler" olarak ayrılır, tam plan dökümüyle

### ⇄ Paylaşılan Hesaplar
- Bir kişi kartını **o kişinin kendi hesabıyla paylaşın** — karşı taraf hesabı kendi perspektifinden (**aynalanmış**) görür
- Üç kademeli yetki: **Görüntüleyen** (sadece görür) · **Katılımcı** (ödeme ekler, kendi eklediğini düzenler) · **Tam yetki** (borç ve ödeme ekler, düzenler)
- **Davet + kabul**: karşı taraf kabul edene kadar hiçbir veri görünmez; hazır davet mesajı WhatsApp'tan gönderilebilir
- Karşı tarafın eklediği kayıtlar **"onay bekliyor"** işaretiyle görünür, tek dokunuşla onaylanır
- Paylaşılan hesaplar isteğe bağlı olarak genel toplamlara dahil edilebilir (varsayılan kapalı)

### ☁️ Bulut Yedekleme (isteğe bağlı)
- **Google ile giriş** yaparak verilerinizi Supabase üzerinde yedekleyin
- **Cihazlar arası gerçek zamanlı senkron**: başka cihaz/sekmedeki değişiklik kısa sürede görünür
- **Çevrimdışı çalışma**: bağlantı yokken localStorage'dan devam eder, bağlantı gelince otomatik yeniden senkron
- Ayarlar'da senkron durumu gösterilir (Senkronize / Bekleyen değişiklik / Çevrimdışı)

### 💾 Diğer
- JSON **yedek indirme / geri yükleme**
- Ana ekrana eklenebilir **PWA** (favicon + apple-touch-icon)

## 📱 Kurulum

Uygulama tek bir HTML dosyasıdır, kurulum gerektirmez:

1. `index.html` dosyasını tarayıcıda açın
2. Tarayıcı menüsünden **"Ana ekrana ekle"** deyin
3. Artık uygulama gibi tam ekran açılır ✅

> 💡 Google girişi için dosyayı `file://` yerine bir yerel sunucu (`http://localhost:...`) veya GitHub Pages üzerinden açmak gerekir; OAuth `file://` üzerinde çalışmaz. Giriş yapmadan uygulama çevrimdışı ve cihaz-içi çalışır.

## 🔒 Gizlilik

Verileriniz varsayılan olarak **cihazınızda** (`localStorage`) saklanır. Google ile
giriş yapmayı seçerseniz veriler ayrıca Supabase'de, yalnızca sizin erişebileceğiniz
şekilde (Row Level Security ile korunan, size özel kayıtlar) saklanır. Giriş yapmazsanız
bu adım hiç devreye girmez.

## 🛠️ Teknik

| | |
|---|---|
| Yapı | Tek dosya HTML + CSS + JS, framework yok |
| Depolama | `localStorage` (JSON yedekleme ile taşınabilir) |
| Bulut yedekleme | [Supabase](https://supabase.com) — Postgres + Auth + Realtime (isteğe bağlı, Google girişiyle) |
| Yayın | GitHub Pages |

## 📋 Sürüm Geçmişi

| Sürüm | Yenilikler |
|---|---|
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
