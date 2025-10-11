import { IResult, jsonResult } from "../models/result";
import UserDB, { IUser } from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../configs/auth";

export const register = async (user: IUser) => {
    // find user - email control
    const findUser = await UserDB.findOne({email: user.email})
    if(findUser) {
        return jsonResult(400, false, 'User already exists', user)
    } else {
        try {
            const bcryptPassword = await bcrypt.hash(user.password, 10)
            const newUser = new UserDB({...user, password: bcryptPassword})
            await newUser.save()
            return jsonResult(201, true, 'User created successfully', newUser)
        } catch (error) {
            return jsonResult(500, false, 'Internal server error', error.message)
        }
    }
}

export const login = async ( user: IUser) => {
    const findUser = await UserDB.findOne({email: user.email})
    if (findUser) {
        const checkPassword = await bcrypt.compare(user.password, findUser.password)
        if (checkPassword) {
            const token = jwt.sign({ id: findUser._id, email: findUser.email, roles: findUser.roles }, SECRET_KEY, { expiresIn: '1h' })
            findUser.jwt = token
            return jsonResult(200, true, 'Login successful', findUser)
        } else {
            return jsonResult(404, false, 'E-mail or Password is incorrect', user)
        }
    }else {
        return jsonResult(404, false, 'E-mail or Password is incorrect', user)
    }
}


//TÜM KULLANCILARI LİSTELE(şifre hariç) 
export const listUsersAll = async (page: number = 1, limit: number = 10): Promise<IResult> => {
  try {
    const skip = (page - 1) * limit;
    const users = await UserDB.find({}, "-password").skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await UserDB.countDocuments();
    return jsonResult(200, true, "Users listed successfully", {
      users,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    return jsonResult(500, false, "Internal Server Error", error.message);
  }
};
//ROL GÜNCELLEME
export const updateUserRole = async (id: string, newRole: string,
): Promise<IResult> => {
  try {
     //Kullanıcıyı bul
    const user = await UserDB.findById(id);
    if (!user) return jsonResult(404, false, "Kullanıcı bulunamadı", null);

    //Role alanının geçerliliğini kontrol et
    const validRoles = ["Admin", "ProjectManager", "Developer"];
    if (!newRole || !validRoles.includes(newRole)) {
      return jsonResult(400, false, "Geçersiz rol değeri", null);
    }

    //Rolü güncelle
    user.roles = [newRole];
    await user.save();

    //Döndürülecek veri
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      date: user.date
    };

    return jsonResult(200, true, "Kullanıcı rolü başarıyla güncellendi", userData);

  } catch (error: any) {
    return jsonResult(500, false, "Sunucu hatası", error.message);
  }
};

// ID İLE KULLANICI GETİRME
export const getUserById = async (id: string): Promise<IResult> => {
  try {
    const user = await UserDB.findById(id, "-password");
    if (!user) {
      return jsonResult(404, false, "User not found", null);}
    return jsonResult(200, true, "User found successfully", user);
  } catch (error: any) {
    return jsonResult(500, false, "Internal Server Error", error.message);
  }
};

//KULLANICI SİL-ADMİN 
export const deleteUser = async (id: string): Promise<IResult> => {
  try {
    const deletedUser = await UserDB.findByIdAndDelete(id);
    if (!deletedUser) return jsonResult(404, false, "User not found", null);
    return jsonResult(200, true, "User deleted successfully", deletedUser);
  } catch (error: any) {
    return jsonResult(500, false, "Internal Server Error", error.message);
  }
};

//ÇIKIŞ YAP
export const logoutUser= async (userId: string): Promise<IResult> => {
  try {
    const user = await UserDB.findById(userId);
    if (!user) return jsonResult(404, false, "User not found", null);

    user.jwt = null; // token’ı sıfırla
    await user.save();

    return jsonResult(200, true, "User logged out successfully", null);
  } catch (error: any) {
    return jsonResult(500, false, "Internal Server Error", error.message);
  }
};