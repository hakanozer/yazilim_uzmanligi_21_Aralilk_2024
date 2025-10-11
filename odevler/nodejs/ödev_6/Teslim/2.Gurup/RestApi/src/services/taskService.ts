import mongoose from "mongoose";
import { IResult, jsonResult } from "../models/result";
import Project from "../models/projectModel";
import UserDB from "../models/userModel";
import { Task, ITask, TaskStatus } from "../models/taskModel";

export class TaskService {
  // POST /projects/:id/tasks — Görev ekleme
  async createTask(
    projectId: string,
    data: Partial<ITask>
  ): Promise<IResult> {
    try {
      if (!mongoose.isValidObjectId(projectId)) {
        return jsonResult(400, false, "Invalid project ID", null);
      }
      if (!data.title) {
        return jsonResult(400, false, "Task title is required", null);
      }

      const assignedEmail = (data as any).assignedEmail as string | undefined;
      const hasAssignedTo = !!data.assignedTo && mongoose.isValidObjectId(data.assignedTo as any);

      if (!hasAssignedTo && !assignedEmail) {
        return jsonResult(400, false, "assignedTo or assignedEmail is required", null);
      }

      const project = await Project.findById(projectId);
      if (!project) {
        return jsonResult(404, false, "Project not found", null);
      }

      let assigneeId: mongoose.Types.ObjectId | null = null;

      if (assignedEmail) {
        const assigneeByEmail = await UserDB.findOne({ email: assignedEmail });
        if (!assigneeByEmail) {
          return jsonResult(404, false, "Assigned user not found", null);
        }
        assigneeId = assigneeByEmail._id as any;
      } else {
        const assigneeById = await UserDB.findById(data.assignedTo);
        if (!assigneeById) {
          return jsonResult(404, false, "Assigned user not found", null);
        }
        assigneeId = assigneeById._id as any;
      }

      const task = new Task({
        title: data.title,
        description: data.description,
        status: data.status ?? TaskStatus.TODO,
        project: project._id,
        assignedTo: assigneeId,
      });

      await task.save();
      await task.populate([
        { path: "project", select: "name" },
        { path: "assignedTo", select: "name email roles" },
      ]);

      return jsonResult(201, true, "Task created successfully", task);
    } catch (error: any) {
      console.error("Create Task Error:", error);
      return jsonResult(500, false, "Internal server error", error.message);
    }
  }

  // GET /projects/:id/tasks — Görevleri listeleme (opsiyonel sayfalama)
  async getTasksByProject(
    projectId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<IResult> {
    try {
      if (!mongoose.isValidObjectId(projectId)) {
        return jsonResult(400, false, "Invalid project ID", null);
      }

      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
        Task.find({ project: projectId })
          .populate([
            { path: "project", select: "name" },
            { path: "assignedTo", select: "name email roles" },
          ])
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Task.countDocuments({ project: projectId }),
      ]);

      return jsonResult(200, true, "Tasks fetched successfully", {
        items,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      });
    } catch (error: any) {
      console.error("Get Tasks By Project Error:", error);
      return jsonResult(500, false, "Internal server error", error.message);
    }
  }

  // PATCH /tasks/:id/status — Görev statü güncelleme
  async updateTaskStatus(taskId: string, newStatus: string): Promise<IResult> {
    try {
      if (!mongoose.isValidObjectId(taskId)) {
        return jsonResult(400, false, "Invalid task ID", null);
      }

      const validStatuses = Object.values(TaskStatus);
      if (!newStatus || !validStatuses.includes(newStatus as TaskStatus)) {
        return jsonResult(400, false, "Invalid status value", {
          allowed: validStatuses,
        });
      }

      const updated = await Task.findByIdAndUpdate(
        taskId,
        { status: newStatus },
        { new: true, runValidators: true }
      ).populate([
        { path: "project", select: "name" },
        { path: "assignedTo", select: "name email roles" },
      ]);

      if (!updated) {
        return jsonResult(404, false, "Task not found", null);
      }

      return jsonResult(200, true, "Task status updated successfully", updated);
    } catch (error: any) {
      console.error("Update Task Status Error:", error);
      return jsonResult(500, false, "Internal server error", error.message);
    }
  }
}

export default TaskService;