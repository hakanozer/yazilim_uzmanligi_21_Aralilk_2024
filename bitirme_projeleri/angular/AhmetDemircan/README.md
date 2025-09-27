# Ludus Magnus

Bu proje, rol tabanlı yetkilendirme (authorization) içeren bir Angular projesidir ve bir ders platformu uygulamasıdır.

---

### Kullanılan Teknolojiler

Bu proje aşağıdaki temel teknolojiler kullanılarak geliştirilmiştir:

-   Angular
-   HTML / SCSS
-   JSON Server (backend verisi için)

---

### Gereksinimler

Projenin başarıyla kurulup çalıştırılması için sisteminizde aşağıdaki yazılımların yüklü olması gerekmektedir:

-   **Node.js**
-   **Angular CLI**
-   **JSON Server**
-   **npm-run-all**: JSON Server ve Angular'ı birlikte başlatmak için `npm install --save-dev npm-run-all` komutu ile kurulmalıdır.

---

### Kurulum ve Başlatma

1.  Gerekli tüm Node modüllerini yükleyin:
    ```bash
    npm install
    ```
2.  Projenin ana dizininden başlatma komutunu çalıştırın:
    ```bash
    npm start
    ```

> **Uyarı**: `npm start` komutu, `3000` portunu JSON Server için ayırmaktadır. Eğer bu port dolu ise, lütfen `package.json` dosyası üzerinden boş bir porta atama yapın.

Uygulama, `http://localhost:4200/` adresinde çalışacaktır.

---

### Uygulama Ekran Görüntüleri

Aşağıda uygulamanın farklı bölümlerine ait ekran görüntülerini görebilirsiniz.

#### Eğitmen Paneli

Bu ekran, eğitmenlerin kendi kurslarını yönetebildiği ve yeni kurslar oluşturabildiği paneli göstermektedir.

![Eğitmen Paneli](./images/Screenshot%202025-09-14%20at%2018.30.44.png)

#### Profil Düzenleme

Kullanıcıların kişisel bilgilerini ve tercihlerini güncelleyebildiği profil düzenleme sayfası.

![Profil Düzenleme](./images/Screenshot%202025-09-14%20at%2018.31.42.png)

#### Kurs Kaydı

Bu ekran, bir kursa kayıt olma veya kaydı iptal etme işlemini göstermektedir.

![Kurs Kaydı](./images/Screenshot%202025-09-14%20at%2018.51.26.png)

#### Kurslar (Mobil Görünüm)

Uygulamanın mobil cihazlardaki responsive (duyarlı) görünümü.

![Kurslar Mobil Görünüm](./images/Screenshot%202025-09-14%20at%2018.40.26.png)