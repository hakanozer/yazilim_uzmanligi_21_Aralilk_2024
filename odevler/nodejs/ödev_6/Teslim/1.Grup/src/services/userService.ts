import UserDB from "../models/userModel";
import { IResult, jsonResult } from "../models/result";
import { eRoles } from "../utils/eRoles";

export const getUsers = async (): Promise<IResult> => {
  try {
    const users = await UserDB.find().select('-password');
    return jsonResult(200, true, "Users retrieved successfully", users);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const updateUserRoles = async (userId: string, newRoles: eRoles[]): Promise<IResult> => {
  try {
    // Rol validasyonu
    const validRoles = Object.values(eRoles);
    const invalidRoles = newRoles.filter(role => !validRoles.includes(role));
    
    if (invalidRoles.length > 0) {
      return jsonResult(400, false, `Invalid roles: ${invalidRoles.join(', ')}`, null);
    }

    const updatedUser = await UserDB.findByIdAndUpdate(
      userId,
      { roles: newRoles },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return jsonResult(404, false, "User not found", null);
    }

    return jsonResult(200, true, "User roles updated successfully", updatedUser);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const getUserById = async (userId: string): Promise<IResult> => {
  try {
    const user = await UserDB.findById(userId).select('-password');
    if (!user) {
      return jsonResult(404, false, "User not found", null);
    }
    return jsonResult(200, true, "User retrieved successfully", user);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};