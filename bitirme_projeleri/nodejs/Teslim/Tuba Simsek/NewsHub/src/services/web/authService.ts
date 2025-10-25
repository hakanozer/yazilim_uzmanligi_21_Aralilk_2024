import UserDB, { IUser } from '../../models/userModel';
import { eRoles } from '../../utils/eRoles';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const registerUser = async (userData: Pick<IUser, 'name' | 'email' | 'password'>): Promise<IUser> => {
    // 1. Email veritabanında var mı diye kontrol et
    const existingUser = await UserDB.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('Bu email adresi zaten kullanılıyor.');
    }

    // 2. Parolayı hash'le (bcrypt ile)
    const saltRounds = 10; // Hash'leme gücü (standart değer)
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // 3. Yeni kullanıcıyı oluştur ve kaydet
    const newUser = new UserDB({
        name: userData.name,
        email: userData.email,
        password: hashedPassword // Hash'lenmiş parolayı kaydet
    })
    return await newUser.save();
};

export const loginUser = async (email: string, password: string): Promise<IUser> => {
    // 1. Kullanıcıyı email'e göre bul
    const user = await UserDB.findOne({ email });
    if (!user) {
        throw new Error('Email veya parola hatalı.');
    }

    // 2. Gelen düz metin parolayla veritabanındaki hash'lenmiş parolayı karşılaştır
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Email veya parola hatalı.');
    }

    // Kullanıcı bulundu ve parola doğru
    return user;
};

export const getUserById = async (userId: string): Promise<Omit<IUser, 'password'> | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return null;
        }
        // findById ile kullanıcıyı bul ve select('-password') ile parola alanını hariç tut
        const user = await UserDB.findById(userId).select('-password');
        return user;
    } catch (error) {
        console.error("ID'ye göre kullanıcı getirilirken hata:", error);
        throw new Error("Kullanıcı bilgileri yüklenirken bir sorun oluştu.");
    }
};

export const updateUserProfile = async (
    userId: string,
    data: { name: string; email: string }
): Promise<Omit<IUser, 'password'> | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return null;
        }
        const existingUserWithEmail = await UserDB.findOne({ email: data.email, _id: { $ne: userId } });
        if (existingUserWithEmail) {
            throw new Error('Bu email adresi başka bir kullanıcı tarafından kullanılıyor.');
        }

        const updatedUser = await UserDB.findByIdAndUpdate(
            userId,
            { name: data.name, email: data.email },
            { new: true, runValidators: true } // runValidators: Modeldeki email formatı gibi kuralları uygular
        ).select('-password');

        return updatedUser;
    } catch (error: any) {
        console.error("Profil güncellenirken hata:", error);
        throw new Error(error.message || "Profil güncellenirken bir sorun oluştu.");
    }
};

export const getAllUsers = async (): Promise<Omit<IUser, 'password'>[]> => {
    try {
        const users = await UserDB.find().select('-password').sort({ createdAt: -1 }); // En yeni kayıtlar üste gelsin
        return users;
    } catch (error) {
        console.error("Tüm kullanıcılar getirilirken hata:", error);
        throw new Error("Kullanıcı listesi yüklenirken bir sorun oluştu.");
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Geçersiz kullanıcı ID'si.");
        }
        // 1. Kullanıcıyı sil
        const deleteResult = await UserDB.findByIdAndDelete(userId);
        if (!deleteResult) {
            throw new Error("Silinecek kullanıcı bulunamadı.");
        }
        console.log(`Kullanıcı (${userId}) silindi.`); // Loglama

    } catch (error) {
        console.error("Kullanıcı silinirken hata:", error);
        throw new Error(error instanceof Error ? error.message : "Kullanıcı silinirken bir sorun oluştu.");
    }
};