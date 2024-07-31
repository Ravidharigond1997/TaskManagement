import express from "express";
import {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} from "../controller/taskController";
import verfiyUser from "../middleware/tokenVerifier.js";

const router = express.Router();

router.post(
  "/createTask",
  validateRequestBody(["taskName", "description"]),
  verfiyUser,
  createTask
);

router.get("/", verfiyUser, getAllTask);

router.put("/tasks/:id", verfiyUser, updateTask);

router.delete("/tasks/:id", verfiyUser, deleteTask);

export default router;
