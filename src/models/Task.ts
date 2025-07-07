import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: Date;
  createdBy: mongoose.Types.ObjectId;
  subTasks: string[];
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subTasks: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<ITask>('Task', taskSchema);
