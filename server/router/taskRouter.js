import express from "express";
import { createTask } from "../controller/taskController";
import verfiyUser from "../middleware/tokenVerifier.js";

const router = express.Router();

router.post(
  "/createTask",
  validateRequestBody(["taskName", "description"]),
  verfiyUser,
  createTask
);
