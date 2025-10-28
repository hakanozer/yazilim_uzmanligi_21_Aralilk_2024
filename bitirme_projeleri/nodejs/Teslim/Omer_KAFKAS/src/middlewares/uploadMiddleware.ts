import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Dosya depolama yapılandırması
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        // Dosyalar uploads/ klasörüne kaydedilir
        cb(null, 'uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        // Dosya adı: timestamp-randomnumber-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`);
    }
});

// Dosya filtresi (sadece resim dosyaları kabul edilir)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // İzin verilen dosya tipleri
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Dosya kabul edildi
    } else {
        cb(new Error('Sadece resim dosyaları yüklenebilir! (JPEG, PNG, GIF, WEBP)'));
    }
};

// Multer yapılandırması
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB maksimum dosya boyutu
    }
});

// Tek dosya upload middleware
export const uploadSingle = upload.single('image'); // 'image' field name

// Çoklu dosya upload middleware (ileride kullanılabilir)
export const uploadMultiple = upload.array('images', 5); // Maksimum 5 dosya
