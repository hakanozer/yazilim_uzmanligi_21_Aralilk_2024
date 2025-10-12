import { Request, Response } from "express";
import { IProject, Project } from "../models/projectModel";
import { dataResult } from "./result";
import moongoose from "mongoose";

type AuthRequest = Request & { user?: { id?: string } | any };

// Project Services

const createProject = async (projectData: IProject) => {
    try {
        const newProject = await Project.create(projectData)
        return dataResult(201, true, 'Proje başarıyla oluşturuldu', newProject);
    } catch (error: any) {
        return dataResult(500, false, error.message || 'Proje oluşturulurken hata oluştu', null);
    }
};

// Get all projects
export const getAllProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
};

// Update a project
export const updateProject = async (projectId:string, projectData: IProject) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      projectData,
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return dataResult(404, false, 'Bu ID ile bir proje bulunamadı', null);
    }
    return dataResult(200, true, 'Proje başarıyla güncellendi', updatedProject);
  } catch (error: any) {
    return dataResult(500, false, error.message || 'Proje güncellenirken hata oluştu', null);
  }
};


// Delete a project
export const deleteProject = async (projectId: string) => {
  try {
    if(!moongoose.Types.ObjectId.isValid(projectId)) {
      return dataResult(400, false, 'Geçersiz proje IDsi', null);
    }
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if(!deletedProject) {
      return dataResult(404, false, 'Bu ID ile bir proje bulunamadı', null);
    }
    return dataResult(200, true, 'Proje başarıyla silindi', {
      id: deletedProject._id,
      name: deletedProject.name
    });
    
  } catch (error) {
    return dataResult(500, false, error.message || 'Proje silinirken hata oluştu', null);

  }
};