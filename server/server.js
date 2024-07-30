import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connection from "./config/db.js";
import userRouter from "./router/userRouter.js";
import adminRouter from "./router/adminRouter.js";

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
app.use("/api/v1", adminRouter);
app.use("/api/v1", studentRouter);

const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
  console.log(`Server is running on  mode on port ${PORT}`);
});
