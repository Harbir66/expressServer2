const database = require('../../database/models');
const { HTTPError } = require('../../errors/customError');
const Tasks = database.Tasks;

const getAllTasks = async () => {
  const tasks = await Tasks.findAll();
  return tasks;
};

const getSingleTask = async (id) => {
  const Task = await Tasks.findOne({
    where: {
      id: Number(id),
    },
  });
  if (Task === null) {
    throw new HTTPError(404, 'Task not found');
  }
  return Task;
};

const postTask = async (body) => {
  const task = await Tasks.create({
    ...body,
    isComplete: false,
  });
  return task;
};

const deleteTaskById = async (id) => {
  const tasksDeleted = await Tasks.destroy({
    where: {
      id: Number(id),
    },
  });
  if (tasksDeleted === 0) {
    throw new HTTPError(404, 'Task not found');
  }
  return tasksDeleted[0];
};

const putTaskById = async (id, body) => {
  const taskUpdated = await Tasks.update(
    {
      ...body,
    },
    {
      where: {
        id: Number(id),
      },
    }
  );
  if (taskUpdated[0] === 0) {
    throw new HTTPError(404, 'Task not found');
  }
  return taskUpdated[0];
};

const patchTaskById = async (id, body) => {
  const taskUpdated = await Tasks.update(
    {
      ...body,
    },
    {
      where: {
        id: Number(id),
      },
    }
  );
  if (taskUpdated[0] === 0) {
    throw new HTTPError(404, 'Task not found');
  }
  return taskUpdated[0];
};

module.exports = {
  getAllTasks,
  getSingleTask,
  postTask,
  deleteTaskById,
  putTaskById,
  patchTaskById,
};
