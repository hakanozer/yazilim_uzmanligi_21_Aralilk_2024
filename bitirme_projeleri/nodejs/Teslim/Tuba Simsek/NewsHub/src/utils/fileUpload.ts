import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Node.js'in dosya sistemi modülü

// Yükleme yapılacak klasörün tam yolunu belirle
// __dirname: Bu dosyanın (fileUpload.ts) bulunduğu dizin (src/utils)
// ../../: İki üst dizine çık (src -> kök dizin)
// public/uploads: Hedef klasör
const uploadDir = path.join(__dirname, '../../public/uploads');

// Uygulama başlamadan önce yükleme klasörünün var olup olmadığını kontrol et, yoksa oluştur
if (!fs.existsSync(uploadDir)) {
    // recursive: true -> Eğer public klasörü de yoksa onu da oluşturur
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Oluşturuldu: ${uploadDir}`);
}

// Disk depolama motorunu yapılandır
const storage = multer.diskStorage({
    // Dosyanın hangi klasöre kaydedileceğini belirtir
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Yukarıda belirlediğimiz klasöre kaydet
    },
    // Kaydedilecek dosyanın adını nasıl oluşturulacağını belirtir
    filename: function (req, file, cb) {
        // Çakışmaları önlemek için benzersiz bir dosya adı oluştur:
        // alanadı-tarihdamgası-rastgelesayı.orijinaluzantı
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Hangi dosya türlerine izin verileceğini belirleyen filtre fonksiyonu
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // İzin verilen MIME tipleri (küçük harfe duyarlı değil)
    const allowedMimeTypes = /jpeg|jpg|png|gif|webp/i; 
    // Dosyanın MIME tipini kontrol et (örn: image/jpeg)
    const mimeCheck = allowedMimeTypes.test(file.mimetype);
    // Dosya uzantısını kontrol et (örn: .jpg)
    const extCheck = allowedMimeTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeCheck && extCheck) {
        // Dosya türü uygunsa, kabul et
        cb(null, true);
    } else {
        // Dosya türü uygun değilse, hata mesajıyla reddet
        cb(new Error('Hata: Sadece resim dosyaları yüklenebilir! (jpeg, jpg, png, gif, webp)'));
    }
};

// Multer middleware'ini yapılandırılmış ayarlarla oluştur
const upload = multer({ 
    storage: storage, // Yukarıda tanımladığımız disk depolama motorunu kullan
    limits: { 
        fileSize: 1024 * 1024 * 5 // Maksimum dosya boyutu: 5 Megabyte
    }, 
    fileFilter: fileFilter // Yukarıda tanımladığımız dosya filtresini kullan
});

// Yapılandırılmış multer middleware'ini dışa aktar
export default upload;