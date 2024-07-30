import mongoose from "mongoose";

const taskModule = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskModule);

export default Task;
