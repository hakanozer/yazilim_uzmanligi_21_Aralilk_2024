import Project, { IProject } from "../models/projectModel";
import mongoose from "mongoose";
import { jsonResult, IResult } from "../models/result";
import User from "../models/userModel";
import { Task } from "../models/taskModel"; // eklendi

export class ProjectService {
    
  // Yeni proje oluşturma
  async createProject(data: Partial<IProject>, userId: string): Promise<IResult> {
    try {
      if (!data.name || !data.description) {
        return jsonResult(400, false, "Project name and description are required", null)
      }
      if (!data.startDate) {
        return jsonResult(400, false, "Project startDate is required", null)
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return jsonResult(404, false, "User not found", null)
      }
  
      const project = new Project({
        ...data,
        startDate: new Date(data.startDate as any),
        createdBy: new mongoose.Types.ObjectId(userId),
      });

      await project.save()
      await project.populate("createdBy", "fullName email role")

      return jsonResult(201, true, "Project created successfully", project)
    } catch (error: any) {
      console.error("Create Project Error:", error);
      return jsonResult(500, false, "Internal server error", error.message)
    }
  }

  //Tüm projeleri listeleme (sayfalama)
  async getAllProjects(page: number = 1, limit: number = 10): Promise<IResult> {
    try {
      const skip = (page - 1) * limit;
      const projects = await Project.find()
        .populate("createdBy teamMembers", "fullName email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Project.countDocuments()

      return jsonResult(200, true, "Projects fetched successfully", {
        items: projects,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      });
    } catch (error: any) {
      console.error("Get All Projects Error:", error)
      return jsonResult(500, false, "Internal server error", error.message)
    }
  }

  //Tek proje getir
  async getProjectById(id: string): Promise<IResult> {
    try {
      if (!mongoose.isValidObjectId(id)) {
        return jsonResult(400, false, "Invalid project ID", null);
      }

      const project = await Project.findById(id).populate(
        "createdBy teamMembers",
        "fullName email role"
      );

      if (!project) {
        return jsonResult(404, false, "Project not found", null)
      }

      return jsonResult(200, true, "Project fetched successfully", project)
    } catch (error: any) {
      console.error("Get Project Error:", error);
      return jsonResult(500, false, "Internal server error", error.message)
    }
  }

  // Proje güncelleme
  async updateProject(id: string, data: Partial<IProject>): Promise<IResult> {
    try {
      if (!mongoose.isValidObjectId(id)) {
        return jsonResult(400, false, "Invalid project ID", null)
      }

      const updated = await Project.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).populate("createdBy teamMembers", "fullName email role")

      if (!updated) {
        return jsonResult(404, false, "Project not found", null)
      }

      return jsonResult(200, true, "Project updated successfully", updated)
    } catch (error: any) {
      console.error("Update Project Error:", error);
      return jsonResult(500, false, "Internal server error", error.message)
    }
  }

  // Proje silme
  async deleteProject(id: string): Promise<IResult> {
    try {
      if (!mongoose.isValidObjectId(id)) {
        return jsonResult(400, false, "Invalid project ID", null)
      }

      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) {
        return jsonResult(404, false, "Project not found", null)
      }

      
    // Önce projeyi sil
    await Project.findByIdAndDelete(id);

    //Sonra bu projeye bağlı tüm taskleri temizlr
    const deletedTasks = await Task.deleteMany({ project: id })

    return jsonResult(200, true, "Project and related tasks deleted successfully", {
      projectId: id,
      deletedTasksCount: deletedTasks.deletedCount,
    });
  } catch (error: any) {
    console.error("Delete Project Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
}

  //Proje arama
  async searchProjects(query: string, page: number = 1, limit: number = 10): Promise<IResult> {
    try {
      if (!query || query.trim().length === 0) {
        return jsonResult(400, false, "Query parameter 'q' is required", null);
      }

      const regex = new RegExp(query, "i");
      const skip = (page - 1) * limit;

      const filter = { $or: [{ name: regex }, { description: regex }] }

      const [items, total] = await Promise.all([
        Project.find(filter)
          .populate("createdBy teamMembers", "fullName email role")
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        Project.countDocuments(filter),
      ]);

      return jsonResult(200, true, "Search results fetched successfully", {
        items,
        query,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      });
    } catch (error: any) {
      console.error("Search Project Error:", error)
      return jsonResult(500, false, "Internal server error", error.message)
    }
  }
}
