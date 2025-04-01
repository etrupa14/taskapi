const taskService = require('../services/taskService');
const createError = require('../utils/createError');

exports.getAllTasks = async (req, res, next) => {
  try {
    const { search, limit, lastKey } = req.query;
    const data = await taskService.getAllTasks({ search, limit, lastKey });

    res.status(200).json({
      success: true,
      data: data.items,
      nextPageKey: data.nextPageKey,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      throw createError('Task not found', 404)
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
