const taskRouter = require('express').Router();

const taskController = require('../controller/taskController');

taskRouter
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.postTask);

taskRouter
  .route('/:id')
  .get(taskController.getSingleTask)
  .delete(taskController.deleteTaskById)
  .put(taskController.putTaskById)
  .patch(taskController.patchTaskById);

module.exports = taskRouter;
