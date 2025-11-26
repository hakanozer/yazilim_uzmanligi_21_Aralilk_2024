# Edit ve 404 Özeti

**Amaç**
- Bu doküman yalnızca `Edit` (güncelleme) akışını ve özel `404` sayfasını anlatır.

**Edit Akışı**
- Route: `/ContactsUpdate/{id}` sayfası varolan bir kaydı düzenlemek için kullanılır.
- GET handler veriyi yükler ve formu doldurur:
  - `Pages/ContactsUpdate.cshtml.cs:24` → `OnGetAsync(int id)` ilgili `id` ile kaydı getirir.
  - Bulunamazsa `NotFound()` dönerek 404 üretir.
- Form binding:
  - Gizli alan: `Pages/ContactsUpdate.cshtml:13` → `asp-for="Contacts.Id"`
  - Girdi alanları: `asp-for="Contacts.Name|Email|Phone|Company"` ile otomatik doldurulur.
- POST handler veriyi doğrular ve günceller:
  - `Pages/ContactsUpdate.cshtml.cs:44–56` → `OnPostAsync()` önce `ModelState` kontrol eder.
  - Geçerli ise `Services/ContactsService.cs:55–63` içindeki `UpdateContactAsync(Contacts)` çağrılır.
  - Başarılı güncelleme sonrası `RedirectToPage("/Dashboard")` yapılır.

**404 Sayfası**
- Bulunamayan kaynaklar için özel HTML sayfası servis edilir.
- Uygulama düzeyi yapılandırma:
  - `Program.cs:47` → `app.UseExceptionHandler("/Error")` diğer hatalar için hata sayfasını kullanır.
  - `Program.cs:49–70` → `app.UseStatusCodePages(...)` içinde 404 özel işlenir:
    - 404 durumunda `Pages/Shared/404.html` okunur ve yanıt gövdesine yazılır.
    - 404 dışındaki durum kodları `/Error?code={statusCode}` adresine yönlendirilir.
- Görsel ve stil:
  - `Pages/Shared/404.html` neon temalı bir tasarım içerir; Tailwind CDN kullanır.
  - Arka plan görseli uzaktan yüklenir ve kullanıcıyı ana sayfaya dönmeye teşvik eden bir buton bulunur.

**Ekran Görseli**
- Aşağıdaki görsel, 404 sayfasının temsili görünümünü yansıtır:

![404 Görseli](img/404sayfası.png )

**Notlar**
- `asp-for` ile form alanlarına manuel `value` eklemeyin; TagHelper mevcut veriyi ve POST sonrası kullanıcı girişini otomatik yönetir.
- Bulunamayan kayıtlar için 404 davranışı sayfa handler’ında `NotFound()` döndürülerek tetiklenir; uygulama, özel 404 HTML’ini servis eder.
