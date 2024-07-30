import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import chalk from "chalk";

import connection from "./config/db.js";
import userRouter from "./router/userRouter.js";

dotenv.config();

// Connect to the database
connection();

const app = express();

// Use CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Set up middleware to serve static files
app.use("/api/v1", userRouter);

const PORT = process.env.PORT || "8000";

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on  mode on port ${PORT}`));
});
