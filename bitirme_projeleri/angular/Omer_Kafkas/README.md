# Egitim_Yonetim_Sistemi
<div align="center">
	<h1>Eğitim Yönetim Sistemi</h1>
	<p><strong>Angular 20 + SSR + json-server tabanlı eğitim / kurs yönetim platformu</strong></p>
	<p>
		<img src="https://img.shields.io/badge/angular-20.x-dd0031?logo=angular&logoColor=white" />
		<img src="https://img.shields.io/badge/build-ssr%20enabled-blue" />
		<img src="https://img.shields.io/badge/state-signals-green" />
	</p>
</div>

## İçindekiler
- [Egitim\_Yonetim\_Sistemi](#egitim_yonetim_sistemi)
	- [İçindekiler](#i̇çindekiler)
	- [Genel Bakış](#genel-bakış)
	- [Öne Çıkan Özellikler](#öne-çıkan-özellikler)
	- [Teknoloji Yığını](#teknoloji-yığını)
	- [Ekran Görselleri](#ekran-görselleri)
	- [Kurulum](#kurulum)
	- [Çalıştırma / Komutlar](#çalıştırma--komutlar)
	- [Mimari Notlar](#mimari-notlar)
	- [Veri Modeli (db.json)](#veri-modeli-dbjson)
	- [Guard ve Yetkilendirme](#guard-ve-yetkilendirme)
	- [Önbellek ve Performans](#önbellek-ve-performans)
	- [Arama Sistemi](#arama-sistemi)
	- [Metrikler](#metrikler)
	- [SSR \& Prerender](#ssr--prerender)
	- [Güvenlik Sertleştirme](#güvenlik-sertleştirme)
	- [Geliştirme Yol Haritası](#geliştirme-yol-haritası)
	- [Katkı](#katkı)
	- [Lisans](#lisans)

---

## Genel Bakış
Öğrenci ve eğitici rollerini destekleyen, kurs oluşturma / listeleme, ders yönetimi, yorum ekleme, profil metrikleri, kategori filtrasyonu ve canlı arama özelliklerine sahip modern bir Angular uygulaması. Backend prototipleme için `json-server` kullanır; gerçek API'ye geçişe hazır gevşek bağlı servis katmanı vardır.

## Öne Çıkan Özellikler
- Rol tabanlı gezinme: Öğrenci / Eğitici görünümü dinamik
- Kurs CRUD (eğitici paneli) + ders ekleme
- Kategori filtreleme (c1–c5: Frontend, Backend, Siber, Veritabanı, Sistem)
- Otomatik kategori → varsayılan resim eşlemesi
- Kurs detay: Ders listesi + yorumlar + yazar eşlemesi cache ile
- Yorum ekleme (öğrenci rolünde)
- Profil metrikleri (öğrenci: toplam kurs / süre / ₺, eğitici: kurs ve öğrenci sayısı)
- Global canlı arama (kullanıcı, kurs, ders, yorum)
- Eğitmenler sayfası (otomatik instructor filtre)
- Signals + computed ile state türetme (NgRx gerektirmeden hafif model)
- Basit TTL cache katmanı (User lookup speed-up)
- Lazy load + bütçe optimizasyonlu build
- Türkçe arayüz, erişilebilir label ve semantic hiyerarşi

## Teknoloji Yığını
- Angular 20 (standalone bileşenler, signals, server output mode)
- RxJS 7.8 (sınırlı: çoğunlukla HttpClient akışları)
- json-server (mock REST)
- Bootstrap 5 (seçici kullanım, özel sadeleştirilmiş CSS + utility)
- Express SSR server (Angular server bundle)

## Ekran Görselleri
Anasayfa

<img width="1907" height="909" alt="Anasayfa" src="https://github.com/user-attachments/assets/b2a54bce-fd50-47cd-83a2-ab274b1d07a7" />

Eğitici Profili

<img width="1903" height="909" alt="Eğitici Profili" src="https://github.com/user-attachments/assets/e93c9813-b578-4779-bcba-3c4459c52bf0" />

Giriş Yap

<img width="1906" height="911" alt="Giriş Yap" src="https://github.com/user-attachments/assets/cc899130-51e7-4ba7-af7d-2384cb123e2c" />

Hakkımızda

<img width="1891" height="907" alt="Hakkımızda" src="https://github.com/user-attachments/assets/be6d636b-3fa6-4bda-b27b-b9cbc65447e8" />

Kayıt Ol

<img width="1888" height="907" alt="Kayıt Ol " src="https://github.com/user-attachments/assets/ac56d0f2-a796-46ee-8080-1f3bc52263a8" />

Kurs Yönetimi

<img width="1897" height="900" alt="Kurs Yönetimi" src="https://github.com/user-attachments/assets/68d71313-cc73-4f4a-a915-4d367d4b1e5c" />

Kurslar

<img width="1893" height="905" alt="Kurslar" src="https://github.com/user-attachments/assets/6c00e821-ece9-4788-a2d5-176077e6a258" />

Navbar

<img width="1892" height="910" alt="Navbar" src="https://github.com/user-attachments/assets/9b40233e-069b-4dc3-980c-59f40dd93e08" />

Öğrenci Profili

<img width="1892" height="905" alt="Öğrenci Profil" src="https://github.com/user-attachments/assets/8c2abf4f-751f-41cd-9a27-2951d583ad10" />

Hızlı oluşturmak için (Windows PowerShell):
```powershell
New-Item -ItemType Directory -Force docs/screenshots | Out-Null
'home','course-detail','edit-courses','profile','search','register' | ForEach-Object { New-Item -ItemType File -Force "docs/screenshots/$_.png" | Out-Null }
```

## Kurulum
```bash
git clone <repo-url>
cd Egitim_Yonetim_Sistemi
npm install
```

## Çalıştırma / Komutlar
| Komut | Açıklama |
|-------|----------|
| `npm run start` | Angular dev + json-server paralel (concurrently) |
| `npm run json-server` | Sadece mock API |
| `npm run build` | Production build (SSR output) |
| `npm test` | Unit test (Karma + Jasmine) |
| `npm run serve:ssr:Egitim_Yonetim_Sistemi` | Build sonrası SSR server çalıştır |

Geliştirme ortamı:
```bash
npm run start
# Frontend: http://localhost:4200
# API:      http://localhost:3000
```

## Mimari Notlar
- Tüm bileşenler standalone; modül ağaçları yok → daha düşük kavramsal yük.
- State yönetimi: local signal + derived computed.
- Guard'lar yönlendirme katmanında minimal sorumlulukla (auth / role / not-auth).
- API erişimi merkezi `Api` servisi ile; endpoint stringleri sade tutuldu.
- Yorum ve kullanıcı eşlemesi tek seferlik cache (O(1) id → kullanıcı). 
- Performans: Gereksiz değişim tespiti azaltmak için OnPush (standalone default) + signal.

## Veri Modeli (db.json)
| Koleksiyon | Alanlar (özet) | Açıklama |
|------------|----------------|----------|
| users | id, name, surname, role, profilePhoto, bio? | Öğrenci + Eğitici |
| categories | id, name | Kurs kategorileri |
| courses | id, title, categoryId, instructorId, price, durationHours, image | Kurs temel modeli |
| lessons | id, courseId, title, durationMin | Kurs dersleri |
| enrollments | id, userId, courseId | Many-to-many ilişki |
| comments | id, courseId, userId, text, createdAt | Kurs yorumları |

## Guard ve Yetkilendirme
| Guard | Amaç | Not |
|-------|------|-----|
| auth | Oturum gerektiren route koruması | Yoksa login yönlendirme |
| not-auth | Login/Register erişimini engelle | Oturum varsa root |
| role | Rol tabanlı erişim | `data.roles` kontrolü |

## Önbellek ve Performans
- `CacheService`: TTL + key based bellek.
- `UserLookupService`: Tek sefer kullanıcı listesi → map.
- Profil / kurs detayında tekrar eden HTTP çağrıları azaltıldı.

## Arama Sistemi
`SearchService` koleksiyonları ardışık veya paralel sorgulayarak tip etiketli sonuç döner: `user | course | lesson | comment`.

## Metrikler
Öğrenci: toplam kurs, süre (dakika), toplam ₺.
Eğitici: yayınlanan kurs sayısı, benzersiz öğrenci sayısı.
Tümü reactive `computed()` ile.

## SSR & Prerender
- `outputMode: server` + `server.ts` entry.
- Dinamik parametreli route'lar için `getPrerenderParams` (kurs detay) eklenebilir / genişletilebilir.
- SEO için sayfa ilk yanıt süresi iyileştirilir.

## Güvenlik Sertleştirme
- Parolalar şu an mock (hash'e uygun yapı önerildi).
- Sensitive alanlar localStorage'da saklanmıyor (yalnızca kullanıcı özeti).
- Potansiyel ileri adım: JWT + HttpOnly cookie, CSP, Rate limiting.

## Geliştirme Yol Haritası
| Aşama | Öneri |
|-------|-------|
| 1 | Parola hash + gerçek auth servisi |
| 2 | Yorum düzenleme / silme yetkisi |
| 3 | Ders ilerleme takibi (progress) |
| 4 | Bildirim / etkinlik akışı |
| 5 | Çoklu dil (i18n) modulasyonu |
| 6 | Resim upload (Signed URL) |

## Katkı
Fork → Branch → Commit → PR akışı. Issue açarken: kısa başlık + yeniden üretim adımları + beklenen / gerçekleşen davranış.

## Lisans
Bu proje MIT Lisansı ile sunulmaktadır. Ayrıntılar için bkz: [LICENSE](./LICENSE).

Telif Hakkı (c) 2025 Ömer Kafkas

---
<sub>Bu dokümantasyon Angular 20 standalone + signal mimari ilkeleri göz önünde bulundurularak hazırlanmıştır.</sub>
