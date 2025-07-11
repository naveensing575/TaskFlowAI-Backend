import { OPENROUTER_API_KEY } from '../config/envConfig'
import Task, { ITask } from '../models/Task'
import axios from 'axios'

export const createTask = async (
  title: string,
  description: string,
  status: string,
  dueDate: Date | undefined,
  createdBy: string,
): Promise<ITask> => {
  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
    createdBy,
  })
  return task
}

export const getTasksByUser = async (userId: string): Promise<ITask[]> => {
  return Task.find({ createdBy: userId })
}

export const updateTask = async (
  taskId: string,
  userId: string,
  updates: Partial<ITask>,
): Promise<ITask | null> => {
  const task = await Task.findById(taskId)
  if (!task) throw new Error('Task not found')
  if (task.createdBy.toString() !== userId)
    throw new Error('Not authorized brotherrrrr')

  return Task.findByIdAndUpdate(taskId, updates, { new: true })
}

export const deleteTask = async (
  taskId: string,
  userId: string,
): Promise<void> => {
  const task = await Task.findById(taskId)
  if (!task) throw new Error('Task not found')
  if (task.createdBy.toString() !== userId) throw new Error('Not authorized')

  await task.deleteOne()
}


export const generateTaskBreakdown = async (taskDescription: string) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are an expert project manager. Always respond ONLY with a valid JSON array of strings.'
          },
          {
            role: 'user',
            content: `Break down this task into 5-7 clear sub-tasks. ONLY respond with a JSON array of short strings. Do NOT include numbers, objects, or any explanation. Example: ["Define goals", "Write plan"]. Task: ${taskDescription}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5000', // Replace with domain while deploying
          'X-Title': 'TaskFlowAI',
          'Content-Type': 'application/json',
        },
      }
    );

    const aiContent = response.data.choices[0].message.content;
    console.log('AI Raw Response:', aiContent);

    let subTasks: string[] = [];

    try {
      subTasks = JSON.parse(aiContent);
    } catch {
      console.warn('Direct JSON.parse failed. Trying fallback extraction...');
      const match = aiContent.match(/\[([\s\S]*?)\]/);
      if (match) {
        const jsonArray = `[${match[1]}]`;
        subTasks = JSON.parse(jsonArray);
      } else {
        throw new Error('Invalid AI response format.');
      }
    }

    if (!Array.isArray(subTasks) || !subTasks.every(item => typeof item === 'string')) {
      throw new Error('AI output is not a valid array of strings.');
    }

    return subTasks;
  } catch (err) {
    console.error('OpenRouter API Error:', err);
    throw err;
  }
};