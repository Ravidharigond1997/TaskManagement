import Task from "../module/task.js";

export const createTask = async (req, res) => {
  try {
    const { taskName, description } = req.body;

    const taskExists = await Task.findOne({ taskName });

    if (taskExists) {
      res.status(400);
      throw new Error("Task already exists");
    }

    const task = await Task.create({
      taskName,
      description,
    });

    if (task) {
      res.status(200).json({
        _id: task._id,
        taskName: task.taskName,
        description: task.description,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Task not created",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
