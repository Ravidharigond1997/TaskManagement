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

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    const taskCount = tasks.length;

    res
      .status(200)
      .json({ message: "All task get successfully", tasks, count: taskCount });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching tasks",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      massage: "Task is updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the task",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the task",
      error: error.message,
    });
  }
};
