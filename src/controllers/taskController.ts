import { Request, Response } from 'express'
import * as taskService from '../services/taskService'
import asyncHandler from 'express-async-handler'
interface CustomRequest extends Request {
  user?: any
}

export const createTask = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { title, description, status, dueDate } = req.body

    if (!title) {
      res.status(400).json({ message: 'Title is required' })
      return
    }

    const task = await taskService.createTask(
      title,
      description,
      status,
      dueDate,
      req.user._id,
    )
    res.status(201).json(task)
  },
)

export const getTasks = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const tasks = await taskService.getTasksByUser(req.user._id)
    res.status(200).json(tasks)
  },
)

export const updateTask = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      const updated = await taskService.updateTask(
        req.params.id,
        req.user._id.toString(),
        req.body,
      )
      res.status(200).json(updated)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  },
)

export const deleteTask = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    try {
      await taskService.deleteTask(req.params.id, req.user._id.toString())
      res.status(200).json({ message: 'Task deleted' })
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  },
)
