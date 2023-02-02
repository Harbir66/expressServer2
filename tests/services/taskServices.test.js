const database = require('../../database/models');
const { HTTPError } = require('../../errors/customError');
const Tasks = database.Tasks;

const taskServices = require('../../src/services/taskServices');

describe('Testing Task Services', () => {
  describe('Get All Tasks Service', () => {
    it('Should return an array of tasks', async () => {
      const resolvedValue = [
        { id: 1, title: 'Task 1', isComplete: false },
        { id: 2, title: 'Task 2', isComplete: false },
      ];
      jest.spyOn(Tasks, 'findAll').mockResolvedValue(resolvedValue);
      const tasks = await taskServices.getAllTasks();
      expect(tasks).toEqual(resolvedValue);
    });
  });

  describe('Get Single Task Service', () => {
    it('should return single task with id', async () => {
      const resolvedValue = { id: 1, title: 'Task 1', isComplete: false };
      jest.spyOn(Tasks, 'findOne').mockResolvedValue(resolvedValue);
      const task = await taskServices.getSingleTask(1);
      expect(task).toEqual(resolvedValue);
    });
    it('should throw an error if task with id not found', async () => {
      const err = new HTTPError(404, 'Task not found');
      jest.spyOn(Tasks, 'findOne').mockResolvedValue(null);
      await expect(taskServices.getSingleTask(1)).rejects.toThrow(err);
    });
  });

  describe('Post Task Service', () => {
    it('Should post a taks', async () => {
      const resolvedValue = { id: 1, title: 'Task 1', isComplete: false };
      jest.spyOn(Tasks, 'create').mockResolvedValue(resolvedValue);
      const task = await taskServices.postTask(resolvedValue);
      expect(task).toEqual(resolvedValue);
    });
  });

  describe('Delete Task Service', () => {
    it('should delete a task with id', async () => {
      const resolvedValue = [1];
      jest.spyOn(Tasks, 'destroy').mockResolvedValue(resolvedValue);

      const mockId = 1;
      const task = await taskServices.deleteTaskById(mockId);
      expect(task).toEqual(resolvedValue[0]);
    });

    it('should throw an error if task with id not found', async () => {
      const err = new HTTPError(404, 'Task not found');
      jest.spyOn(Tasks, 'destroy').mockResolvedValue(0);
      await expect(taskServices.deleteTaskById(1)).rejects.toThrow(err);
    });
  });

  describe('Put Task Service', () => {
    it('should update a task with id', async () => {
      const resolvedValue = [1];
      jest.spyOn(Tasks, 'update').mockResolvedValue(resolvedValue);
      const mockId = 1;
      const mockBody = { title: 'Task 1', isComplete: false };
      const tasksUpdated = await taskServices.putTaskById(mockId, mockBody);
      expect(tasksUpdated).toEqual(resolvedValue[0]);
    });

    it('should throw an error if task with id not found', async () => {
      const err = new HTTPError(404, 'Task not found');
      jest.spyOn(Tasks, 'update').mockResolvedValue([0]);
      await expect(taskServices.putTaskById(1, {})).rejects.toThrow(err);
    });
  });

  describe('Patch Task Service', () => {
    it('should update a task with id', async () => {
      const resolvedValue = [1];
      jest.spyOn(Tasks, 'update').mockResolvedValue(resolvedValue);
      const mockId = 1;
      const mockBody = { title: 'Task 1', isComplete: false };
      const tasksUpdated = await taskServices.patchTaskById(mockId, mockBody);
      expect(tasksUpdated).toEqual(resolvedValue[0]);
    });

    it('should throw an error if task with id not found', async () => {
      const err = new HTTPError(404, 'Task not found');
      jest.spyOn(Tasks, 'update').mockResolvedValue([0]);
      await expect(taskServices.patchTaskById(1, {})).rejects.toThrow(err);
    });
  });
});
