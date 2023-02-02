const express = require('express');
const app = express();
app.use(express.json());

//
const database = require('./database/models');
console.log(typeof database.Tasks);
console.log(database.Tasks);
const Tasks = database.Tasks;

//

const port = 3000;

// const tasks = [];
// const tempTask = {
//   name: 'abc',
//   id: 0,
//   isComplete: true,
// };
// tasks.push(tempTask);
// let index = 0;

app.listen(port, () => {
  console.log('Listening on port 3000...');
});

// GET methods

app.get('/tasks', async (req, res) => {
  console.log('Get all tasks');
  const allTasks = await Tasks.findAll();
  res.status(200).json(allTasks);
});

app.get('/tasks/:id', async (req, res) => {
  console.log('Get task by id');
  const { id } = req.params;
  const requiredTask = await Tasks.findOne({
    where: {
      id: Number(id),
    },
  });
  if (requiredTask === null) {
    res.status(404).send('Task Not Found').end();
  }
  res.status(200).send(requiredTask);
});

// POST methods

app.post('/tasks', async (req, res) => {
  console.log('Post a task');
  //   index += 1;
  //   const newTask = {
  //     ...req.body,
  //     id: index,
  //     isComplete: false,
  //   };
  const newTask = await Tasks.create({
    ...req.body,
    isComplete: false,
  });
  //   tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT methods

app.put('/tasks/:id', async (req, res) => {
  console.log('Updating entire task');
  const { id } = req.params;
  const requiredTask = await Tasks.findOne({
    where: {
      id: Number(id),
    },
  });
  if (requiredTask === null) {
    res.status(404).send('Task not found').end();
  }
  await Tasks.update(req.body, {
    where: {
      id: Number(id),
    },
  });
  // console.log('Updated task: ');
  res.status(200).json(req.body).end();
});

// DELETE methods

app.delete('/tasks/:id', async (req, res) => {
  console.log('Deleting single task');
  const { id } = req.params;
  const requiredTask = await Tasks.findOne({
    where: {
      id: Number(id),
    },
  });

  if (requiredTask === null) {
    res.status(404).send('Task not found');
  } else {
    await Tasks.destroy({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(requiredTask).end();
  }
});

// PATCH methods

app.patch('/tasks/:id', async (req, res) => {
  console.log('Patching a task');
  const { id } = req.params;
  const requiredTask = await Tasks.findOne({
    where: {
      id: Number(id),
    },
  });
  if (requiredTask === null) {
    res.status(404).send('Task not found').end();
  }
  await Tasks.update(req.body, {
    where: {
      id: Number(id),
    },
  });
  console.log('Updated task: ');
  res.status(200).json('Updated').end();
});
