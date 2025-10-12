import mongoose, { Schema, Document } from 'mongoose';

export interface ITask {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
    assignedTo: string;
    createdBy: string;
}

const TaskSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'medium'},
    dueDate: {type: Date },
    assignedTo: {type: String},
    createdBy: {type: String}
},
{ timestamps: true }
);
const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
