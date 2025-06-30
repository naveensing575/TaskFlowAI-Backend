import Task, { ITask } from '../models/Task';

export const createTask = async (
  title: string,
  description: string,
  status: string,
  dueDate: Date | undefined,
  createdBy: string
): Promise<ITask> => {
  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
    createdBy,
  });
  return task;
};

export const getTasksByUser = async (userId: string): Promise<ITask[]> => {
  return Task.find({ createdBy: userId });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  updates: Partial<ITask>
): Promise<ITask | null> => {

  const task = await Task.findById(taskId);
  if (!task) throw new Error('Task not found');
  if (task.createdBy.toString() !== userId) throw new Error('Not authorized brotherrrrr');

  return Task.findByIdAndUpdate(taskId, updates, { new: true });
};

export const deleteTask = async (
  taskId: string,
  userId: string
): Promise<void> => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error('Task not found');
  if (task.createdBy.toString() !== userId) throw new Error('Not authorized');

  await task.deleteOne();
};
