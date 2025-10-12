import TaskDB, { ITask } from "../models/taskModel";
import { IResult, jsonResult } from "../models/result";

export const createTask = async (taskData: ITask, userId: string): Promise<IResult> => {
  try {
    const newTask = new TaskDB({
      ...taskData,
      createdBy: userId
    });
    
    await newTask.save();
    
    // Populate işlemlerini ayrı yapın
    const populatedTask = await TaskDB.findById(newTask._id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('project', 'name');
    
    return jsonResult(201, true, "Task created successfully", populatedTask);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const getTasksByProject = async (projectId: string, userId?: string): Promise<IResult> => {
  try {
    let query: any = { project: projectId };
    
    // Eğer userId varsa ve admin değilse, sadece kendi task'larını görsün
    if (userId) {
      query.assignedTo = userId;
    }
    
    const tasks = await TaskDB.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email roles')
      .populate('project', 'name');
    
    return jsonResult(200, true, "Tasks retrieved successfully", tasks);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const updateTaskStatus = async (taskId: string, status: string, userId: string): Promise<IResult> => {
  try {
    const task = await TaskDB.findById(taskId);
    
    if (!task) {
      return jsonResult(404, false, "Task not found", null);
    }

    const updatedTask = await TaskDB.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true }
    )
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email')
    .populate('project', 'name');

    if (!updatedTask) {
      return jsonResult(404, false, "Task not found after update", null);
    }

    return jsonResult(200, true, "Task status updated successfully", updatedTask);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

export const getTaskById = async (taskId: string): Promise<IResult> => {
  try {
    const task = await TaskDB.findById(taskId)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email roles')
      .populate('project', 'name');
    
    if (!task) {
      return jsonResult(404, false, "Task not found", null);
    }
    
    return jsonResult(200, true, "Task retrieved successfully", task);
  } catch (error: any) {
    return jsonResult(500, false, "Internal server error", error.message);
  }
};