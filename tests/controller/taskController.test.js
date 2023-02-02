const taskServices = require('../../src/services/taskServices');
const taskController = require('../../src/controller/taskController');
const { HTTPError } = require('../../errors/customError');

describe('Testing Task Services', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('Create Task Controller', () => {
    it('should create a task when passed request body', async () => {
      const resolvedValue = {
        title: 'test',
      };
      jest.spyOn(taskServices, 'postTask').mockResolvedValue(resolvedValue);
      const mockRes = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const mockReq = {
        body: { title: 'test' },
      };
      await taskController.postTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });
  });

  describe('Get All Task Service', () => {
    it('should return list of all the tasks when passed no id in request', async () => {
      const resolvedValue = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ];

      jest.spyOn(taskServices, 'getAllTasks').mockResolvedValue(resolvedValue);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.getAllTasks(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });

    it('should return the tasks when id passed in request is present in database', async () => {
      const resolvedValue = {
        id: 1,
      };
      jest
        .spyOn(taskServices, 'getSingleTask')
        .mockResolvedValue(resolvedValue);
      const mockReq = {
        params: { id: 1 },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.getSingleTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });

    it('should return 404 not found when id not present in database', async () => {
      const Err = new HTTPError(404, 'Task not found');
      jest.spyOn(taskServices, 'getSingleTask').mockRejectedValue(Err);
      const mockReq = {
        params: { id: 1 },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.getSingleTask(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(Err.statusCode);
      expect(mockRes.json).toBeCalledWith({ message: Err.message });
    });
  });

  describe('Delete a task service', () => {
    it('should return status 200 and delete task when correct id is', async () => {
      const resolvedValue = {
        id: 1,
      };
      jest
        .spyOn(taskServices, 'deleteTaskById')
        .mockResolvedValue(resolvedValue);
      const mockReq = {
        params: { id: 1 },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.deleteTaskById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });

    it('should return 404 not found when id not present in database', async () => {
      const Err = new HTTPError(404, 'Task not found');
      jest.spyOn(taskServices, 'deleteTaskById').mockRejectedValue(Err);
      const mockReq = {
        params: { id: 1 },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.deleteTaskById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(Err.statusCode);
      expect(mockRes.json).toBeCalledWith({ message: Err.message });
    });
  });

  describe('Put a task service', () => {
    it('should return status 200 and update whole task when id is correct', async () => {
      const resolvedValue = {
        title: 'test',
      };
      jest.spyOn(taskServices, 'putTaskById').mockResolvedValue(resolvedValue);
      const mockReq = {
        params: { id: 1 },
        body: { title: 'test' },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.putTaskById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });

    it('should return 404 not found when id not present in database', async () => {
      const Err = new HTTPError(404, 'Task not found');
      jest.spyOn(taskServices, 'putTaskById').mockRejectedValue(Err);
      const mockReq = {
        params: { id: 1 },
        body: { title: 'test' },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.putTaskById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(Err.statusCode);
      expect(mockRes.json).toBeCalledWith({ message: Err.message });
    });
  });

  describe('Patch a task service', () => {
    it('should return status 200 and update whole task when id is correct', async () => {
      const resolvedValue = {
        isComplete: true,
      };
      jest
        .spyOn(taskServices, 'patchTaskById')
        .mockResolvedValue(resolvedValue);
      const mockReq = {
        params: { id: 1 },
        body: { isComplete: true },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      console.log(mockRes);
      await taskController.patchTaskById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(resolvedValue);
    });

    it('should return 404 not found when id not present in database', async () => {
      const Err = new HTTPError(404, 'Task not found');
      jest.spyOn(taskServices, 'patchTaskById').mockRejectedValue(Err);
      const mockReq = {
        params: { id: 1 },
        body: { title: 'test' },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await taskController.patchTaskById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(Err.statusCode);
      expect(mockRes.json).toBeCalledWith({ message: Err.message });
    });
  });
});
