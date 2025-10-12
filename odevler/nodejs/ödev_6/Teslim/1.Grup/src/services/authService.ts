import UserDB, { IUser } from "../models/userModel";
import { IResult, jsonResult } from "../models/result";
import { encrypt, decrypt } from "../utils/crypto";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/auth";
import { eRoles } from "../utils/eRoles";

export const registerUser = async (userData: IUser): Promise<IResult> => {
  const existingUser = await UserDB.findOne({ email: userData.email });
  if (existingUser) {
    return jsonResult(400, false, "User already exists", null);
  }

  try {
    const encryptedPassword = encrypt(userData.password);
    const roles = userData.roles?.length ? userData.roles : [eRoles.Developer];
    
    const newUser = new UserDB({ 
      ...userData, 
      password: encryptedPassword,
      roles 
    });
    await newUser.save();
    
    const { password, ...userWithoutPassword } = newUser.toObject();
    return jsonResult(201, true, "User created successfully", userWithoutPassword);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const loginUser = async (credentials: { email: string; password: string }): Promise<IResult> => {
  const user = await UserDB.findOne({ email: credentials.email });
  if (!user) {
    return jsonResult(404, false, "User not found", null);
  }

  const decryptedPassword = decrypt(user.password);
  if (decryptedPassword !== credentials.password) {
    return jsonResult(401, false, "Invalid credentials", null);
  }

  const token = jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      roles: user.roles 
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  const { password, ...userWithoutPassword } = user.toObject();
  return jsonResult(200, true, "Login successful", {
    ...userWithoutPassword,
    jwt: token
  });
};