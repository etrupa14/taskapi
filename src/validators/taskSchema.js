const Joi = require('joi');
const { TaskStatus } = require("../database/models/taskModel")

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid(TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED).required(),
});

module.exports = taskSchema;