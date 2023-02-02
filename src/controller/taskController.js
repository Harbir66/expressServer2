const taskServices = require('../services/taskServices');
const { HTTPError } = require('../../errors/customError');
// const Joi = require('joi');

const getAllTasks = async (req, res) => {
  const Tasks = await taskServices.getAllTasks();
  res.status(200).json(Tasks);
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredTask = await taskServices.getSingleTask(id);
    res.status(200).json(requiredTask);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};

const postTask = async (req, res) => {
  const body = req.body;
  await taskServices.postTask(body);
  res.status(201);
  res.json(body);
};

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredTask = await taskServices.deleteTaskById(id);
    res.status(200).json(requiredTask).end();
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};

const putTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await taskServices.putTaskById(id, body);
    res.status(200).json(body);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};

const patchTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await taskServices.patchTaskById(id, body);
    res.status(200).json(body);
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  postTask,
  deleteTaskById,
  putTaskById,
  patchTaskById,
};
