const router = require('express').Router();

const tasksRouter = require('./taskRouter');

router.use('/tasks', tasksRouter);

module.exports = router;
