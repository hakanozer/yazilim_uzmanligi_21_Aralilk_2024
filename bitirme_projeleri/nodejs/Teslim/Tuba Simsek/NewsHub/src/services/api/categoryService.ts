import Category, { ICategory } from "../../models/categoryModel";
import { IResult, jsonResult } from "../../models/result";
import mongoose from "mongoose";


export const addCategory = async (categoryData: ICategory, userId: string): Promise<IResult> => {
    try {
        // Kategori adı zaten var mı kontrol et
        const existingCategory = await Category.findOne({ 
            name: { $regex: new RegExp(`^${categoryData.name}$`, 'i') } 
        });

        if (existingCategory) {
            return jsonResult(400, false, 'Category already exists', null);
        }

        // Yeni kategori oluştur
        const newCategory = new Category({
            name: categoryData.name,
            description: categoryData.description,
            isActive: categoryData.isactive ?? true,
            createdBy: userId
        });

        await newCategory.save();
        
        return jsonResult(201, true, 'Category created successfully', {
            id: newCategory._id,
            name: newCategory.name,
            description: newCategory.description,
            isActive: newCategory.isactive,
            createdAt: newCategory.createdAt
        });

    } catch (error) {
        console.error('Add Category Error:', error);
        return jsonResult(500, false, 'Internal server error', error.message)
    }

};


//Kategori Düzenleme
export const editCategory = async (categoryId: string, categoryData: any): Promise<IResult> => {
  try {
    // ID geçerli mi?
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return jsonResult(400, false, "Invalid category ID", null);
    }

    const updates: any = {};

    //Güncellenmek istenen alanları kontrol ediyoruz
    if (categoryData?.name !== undefined) {
      if (categoryData.name.length < 2 || categoryData.name.length > 50) {
        return jsonResult(400, false, "Category name must be between 2 and 50 characters", null);
      }
      updates.name = categoryData.name;
    }

    if (categoryData?.description !== undefined) {
      if (categoryData.description.length > 200) {
        return jsonResult(400, false, "Description can be maximum 200 characters", null);
      }
      updates.description = categoryData.description;
    }

    if (categoryData?.isactive !== undefined) updates.isactive = categoryData.isactive;

    // Hiç alan gönderilmediyse
    if (Object.keys(updates).length === 0) {
      return jsonResult(400, false, "No fields provided for update", null);
    }

    //Kategoriyi güncelle
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    // Veritabanında gerçekten böyle bir kategori var mı
    if (!updatedCategory) {
      return jsonResult(404, false, "Category not found", null);
    }

    // Güncelleme başarılıysa
    return jsonResult(200, true, "Category updated successfully", updatedCategory);
  } catch (error: any) {
    console.error("Edit Category Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};


//Kategori Silme
export const removeCategory = async (categoryId: string) => {
  try {
    // ID geçerli mi?
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return jsonResult(400, false, "Invalid category id", null);
    }

    // Kategori var mı?
    const deleted = await Category.findByIdAndDelete(categoryId);
    if (!deleted) {
      return jsonResult(404, false, "Category not found", null);
    }

    //Başarılı dönüş
    return jsonResult(200, true, "Category deleted successfully", {
      id: deleted._id,
      name: deleted.name,
    });
  } catch (error: any) {
    console.error("Remove Category Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};