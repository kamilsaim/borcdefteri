# Borç Defteri — Supabase Bağlantısı

## Amaç

`borc-defteri.html`'deki localStorage tabanlı `Store` katmanını, mevcut **beebook** Supabase projesine (`pdxnpnlwrtswwifevlil`) bağlamak. Aynı projede zaten Google girişi ve `bd_*` önekli normalize tablo deseni var; borç defteri için `borc_` önekiyle aynı desen kullanılacak.

## Şema

```sql
create table borc_ayarlar (
  user_id uuid primary key references auth.users(id) default auth.uid(),
  cutoff_day int not null default 23,
  pay_day int not null default 1,
  updated_at timestamptz default now()
);

create table borc_people (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  ad text not null,
  created_at timestamptz default now()
);

create table borc_debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  person_id uuid not null references borc_people(id) on delete cascade,
  kind text not null check (kind in ('cash_out','cash_in','installment')),
  amount numeric not null check (amount > 0),
  date date not null,
  aciklama text,
  count int,
  first_due date,
  created_at timestamptz default now()
);

create table borc_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  person_id uuid not null references borc_people(id) on delete cascade,
  amount numeric not null check (amount > 0),
  date date not null,
  dir text not null check (dir in ('in','out')),
  note text,
  created_at timestamptz default now()
);
```

RLS: her tabloda `bd_*` ile aynı desen — select/insert/update/delete politikaları `auth.uid() = user_id`.

## Giriş

- Google girişi zorunlu. Oturum yoksa tüm `.view` içeriğinin yerine tek bir "Google ile Giriş Yap" ekranı gösterilir.
- Mevcut cihazdaki localStorage verisi Supabase'e taşınmaz — sıfırdan başlanır. Export/import butonları zaten manuel yedekleme sağlıyor.
- Supabase Auth → Redirect URLs listesine eklenecek: `https://kamilsaim.github.io/borcdefteri/`, `http://localhost:*`.

## Store katmanı tasarımı

`Store` nesnesinin dış arayüzü değişmez (`load()`, `save(state)`), çağıran kod (`await Store.save(state); render();` gibi ~10 çağrı yeri) dokunulmadan kalır.

### save(state)

1. State anında `localStorage`'a yazılır (önbellek + offline kuyruk).
2. `state` ile son bilinen uzak kopya (`Store._lastSynced`) karşılaştırılır; fark 4 tabloya `upsert`/`delete` olarak gönderilir (`borc_ayarlar` upsert, `borc_people`/`borc_debts`/`borc_payments` için eklenen/değişen satırlar upsert, kaldırılanlar delete).
3. Başarılıysa `_lastSynced = state`, senkron durumu `synced` + zaman damgası.
4. Başarısızsa (ağ yok/hata) senkron durumu `pending`; state localStorage'da kalır, `online` event'inde ve bir sonraki `save` çağrısında yeniden denenir.

### load()

1. Supabase'den okunabiliyorsa 4 tablo çekilip `state` şekline dönüştürülür, `_lastSynced` eşitlenir, senkron durumu `synced`.
2. Okunamıyorsa (offline/hata) localStorage'daki son bilinen state döner, senkron durumu `offline`.

### Realtime

- 4 tabloda `postgres_changes` aboneliği, filtre `user_id=eq.<uid>`.
- Event geldiğinde 300ms debounce; o an bekleyen bir yerel `save` yoksa `load()` tekrar çağrılıp state yeniden çekilir ve `render()` tetiklenir.
- Çakışma çözümü yok — tam state yeniden yükleme stratejisi (son yazan kazanır, satır bazlı upsert/delete zaten idempotent).

### Senkron göstergesi

Ayarlar sekmesi → "Veri" kartının altına tek satır:
- `● Senkronize · 14:32`
- `● Bekleyen değişiklik var`
- `● Çevrimdışı`

## Kapsam dışı

- Operational-transform / satır bazlı çakışma birleştirme — full-state reload stratejisi yeterli görülüyor (tek kullanıcı, düşük yazma sıklığı).
- Borç hesaplama / FIFO / taksit mantığında değişiklik yok.

## Etkilenen dosyalar

- `borc-defteri.html` (ve GitHub Pages için aynasını tutan `index.html`) — `<head>`'e Supabase JS CDN + config, `Store` nesnesinin yeniden yazımı, giriş ekranı, senkron göstergesi.
- Supabase projesi `pdxnpnlwrtswwifevlil`: migration (4 tablo + RLS), Auth redirect URL ayarı.
