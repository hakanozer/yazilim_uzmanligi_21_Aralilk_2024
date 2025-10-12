import mongoose, { mongo } from "mongoose";
import Task, { ITask } from "../models/taskmodel";
import { dataResult } from './result';

// Görev ekleme servisi
export const addTask = async (taskData: Partial<ITask>) => {
    try {
        const newTask = await Task.create(taskData);
        return dataResult(201, true, 'Görev başarıyla eklendi', newTask);
    } catch (error: any) {
        return dataResult(500, false, error.message || 'Görev eklenirken hata oluştu', null);
    }
};

// Tüm görevleri getirme servisi - Filters eklendi
export const getAllTasks = async (filters?: any) => {
    try {
        const query: any = {};
        
        // Filtre parametrelerini işle
        if (filters) {
            if (filters.status) query.status = filters.status;
            if (filters.priority) query.priority = filters.priority;
            if (filters.assignedTo) query.assignedTo = filters.assignedTo;
            if (filters.createdBy) query.createdBy = filters.createdBy;
        }
        
        const tasks = await Task.find(query).sort({ createdAt: -1 });
        return dataResult(200, true, 'Görevler başarıyla getirildi', tasks);
    } catch (error: any) {
        return dataResult(500, false, error.message || 'Görevler getirilirken hata oluştu', null);
    }
};

// ID ile görev getirme servisi
export const getTaskById = async (taskId: string) => {
    try {
        const task = await Task.findById(taskId);
        
        if (!task) {
            return dataResult(404, false, 'Bu ID ile bir görev bulunamadı', null);
        }
        
        return dataResult(200, true, 'Görev başarıyla getirildi', task);
    } catch (error: any) {
        return dataResult(500, false, error.message || 'Görev getirilirken hata oluştu', null);
    }
};

// Görev güncelleme servisi
export const updateTask = async (taskId: string, taskData: Partial<ITask>) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId, 
            taskData, 
            { new: true, runValidators: true }
        );
        
        if (!updatedTask) {
            return dataResult(404, false, 'Bu ID ile bir görev bulunamadı', null);
        }

        return dataResult(200, true, 'Görev başarıyla güncellendi', updatedTask);
    } catch (error: any) {
        return dataResult(500, false, error.message || 'Görev güncellenirken hata oluştu', null);
    }
};

// Görev silme servisi
export const deleteTask = async (taskId: string) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(taskId)){
            return dataResult(400, false, 'Geçersiz görev IDsi', null);
        }
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if(!deletedTask){
            return dataResult(404, false, 'Bu ID ile bir görev bulunamadı', null);
        }
        return dataResult(200, true, 'Görev başarıyla silindi'), {
            id: deletedTask._id,
            title: deletedTask.title
        };
    } catch(error: any){
        return dataResult(500, false, error.message || 'Görev silinirken hata oluştu', null);
    }
};

// Görev durumu güncelleme servisi
export const updateTaskStatus = async (taskId: string, status: string) => {
    try {
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return dataResult(400, false, 'Geçersiz durum. İzin verilen: pending, in-progress, completed', null);
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return dataResult(404, false, 'Bu ID ile bir görev bulunamadı', null);
        }

        return dataResult(200, true, 'Görev durumu başarıyla güncellendi', updatedTask);
    } catch (error: any) {
        return dataResult(500, false, error.message || 'Görev durumu güncellenirken hata oluştu', null);
    }
};

// Kullanıcının görevlerini getirme servisi
export const getTasksByUser = async (userId: string) => {
    try {
        const tasks = await Task.find({
            $or: [
                { assignedTo: userId },
                { createdBy: userId }
            ]
        }).sort({ dueDate: 1 });

        return dataResult(200, true, 'Kullanıcı görevleri başarıyla getirildi', tasks);
    } catch (error: any) {
        return dataResult(500, false, error.message || 'Kullanıcı görevleri getirilirken hata oluştu', null);
    }
};

// Default export
const taskServices = {
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTasksByUser
};


export default taskServices;
