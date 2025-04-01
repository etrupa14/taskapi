const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateRequest = require('../middleware/validateRequest');
const taskSchema = require('../validators/taskSchema');

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.post('/', validateRequest(taskSchema), taskController.createTask);

router.put('/:id', validateRequest(taskSchema), taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
