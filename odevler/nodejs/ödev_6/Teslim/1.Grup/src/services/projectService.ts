import ProjectDB, { IProject } from "../models/projectModel";
import { IResult, jsonResult } from "../models/result";

export const createProject = async (projectData: IProject, userId: string): Promise<IResult> => {
  try {
    const newProject = new ProjectDB({
      ...projectData,
      createdBy: userId
    });
    
    await newProject.save();
    
    const populatedProject = await ProjectDB.findById(newProject._id)
      .populate('createdBy', 'name email')
      .populate('assignedUsers', 'name email');
    
    return jsonResult(201, true, "Project created successfully", populatedProject);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const getProjects = async (userId?: string): Promise<IResult> => {
  try {
    let query = {};
    
    // Eğer userId varsa, sadece kullanıcının projelerini getir
    if (userId) {
      query = {
        $or: [
          { createdBy: userId },
          { assignedUsers: userId }
        ]
      };
    }
    
    const projects = await ProjectDB.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedUsers', 'name email roles');
    
    return jsonResult(200, true, "Projects retrieved successfully", projects);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const updateProject = async (projectId: string, updateData: Partial<IProject>, userId: string): Promise<IResult> => {
  try {
    const project = await ProjectDB.findById(projectId);
    
    if (!project) {
      return jsonResult(404, false, "Project not found", null);
    }

    const updatedProject = await ProjectDB.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email')
     .populate('assignedUsers', 'name email roles');

    return jsonResult(200, true, "Project updated successfully", updatedProject);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const deleteProject = async (projectId: string): Promise<IResult> => {
  try {
    const project = await ProjectDB.findByIdAndDelete(projectId);
    
    if (!project) {
      return jsonResult(404, false, "Project not found", null);
    }

    return jsonResult(200, true, "Project deleted successfully", null);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const getProjectById = async (projectId: string): Promise<IResult> => {
  try {
    const project = await ProjectDB.findById(projectId)
      .populate('createdBy', 'name email')
      .populate('assignedUsers', 'name email roles');
    
    if (!project) {
      return jsonResult(404, false, "Project not found", null);
    }
    
    return jsonResult(200, true, "Project retrieved successfully", project);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};