import { Request, Response } from 'express';
import UserDb from '../models/userModel';
import { generateToken, generateRefreshToken, verifyToken } from '../utils/jwtUtility';
import { encrypt, decrypt } from '../config/cryptoJS';
import { successResult, errorResult } from '../models/result';

// Kullanıcı Kaydı
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;
        // Validasyon artık middleware'de yapılıyor

        // Kullanıcı var mı kontrol et
        const existingUser = await UserDb.findOne({ email });
        if (existingUser) {
            res.status(400).json(errorResult('Bu email adresi zaten kullanılıyor!'));
            return;
        }

        // Şifreyi şifrele
        const encryptedPassword = encrypt(password);

        // Yeni kullanıcı oluştur
        const user = new UserDb({ 
            name, 
            email, 
            password: encryptedPassword,
            role: role || 'User' // Varsayılan olarak User
        });
        await user.save();

        // Token'lar oluştur
        const accessToken = generateToken((user._id as any).toString());
        const refreshToken = generateRefreshToken((user._id as any).toString());

        res.status(201).json(successResult('Kayıt başarılı!', {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }));
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Kullanıcı Girişi
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        // Validasyon artık middleware'de yapılıyor

        // Kullanıcıyı bul
        const user = await UserDb.findOne({ email });
        if (!user) {
            res.status(401).json(errorResult('Geçersiz email veya şifre!'));
            return;
        }

        // Şifre kontrolü
        const decryptedPassword = decrypt(user.password);
        if (decryptedPassword !== password) {
            res.status(401).json(errorResult('Geçersiz email veya şifre!'));
            return;
        }

        // Token'lar oluştur
        const accessToken = generateToken((user._id as any).toString());
        const refreshToken = generateRefreshToken((user._id as any).toString());

        res.status(200).json(successResult('Giriş başarılı!', {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }));
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Kullanıcı Profili (Protected Route)
export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await UserDb.findById(req.userId).select('-password');
        
        if (!user) {
            res.status(404).json(errorResult('Kullanıcı bulunamadı!'));
            return;
        }

        res.status(200).json(successResult('Profil bilgileri', { user }));
    } catch (error) {
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Refresh Token ile Yeni Access Token Al
export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;
        // Validasyon artık middleware'de yapılıyor

        // Token'ı doğrula
        const decoded = verifyToken(refreshToken);

        // Kullanıcı var mı kontrol et
        const user = await UserDb.findById(decoded.id);
        if (!user) {
            res.status(404).json(errorResult('Kullanıcı bulunamadı!'));
            return;
        }

        // Yeni access token oluştur
        const newAccessToken = generateToken((user._id as any).toString());

        res.status(200).json(successResult('Token yenilendi!', {
            accessToken: newAccessToken
        }));
    } catch (error) {
        res.status(401).json(errorResult(
            'Geçersiz refresh token!',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};