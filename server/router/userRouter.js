// routes/userRouter.js
import express from "express";
import { createUser, loginController } from "../controller/userController.js";
import { validateRequestBody } from "../middleware/validateRequestBody.js";

const router = express.Router();

router.post(
  "/register",
  validateRequestBody(["name", "email", "number", "password", "userName"]),
  createUser
);

router.post(
  "/login",
  validateRequestBody(["email", "password"]),
  loginController
);

export default router;
