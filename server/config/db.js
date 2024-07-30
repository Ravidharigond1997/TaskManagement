import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const db_uri = process.env.MONGO_URI;

const connection = async () => {
  try {
    const conn = await mongoose.connect(db_uri);
    console.log(
      chalk.green(`Connected To MongoDB database: ${conn.connection.host}`)
    );
    console.log(chalk.cyan(`Connection string: ${db_uri}`));
  } catch (err) {
    console.log(chalk.red(`Connection error: ${err.message}`));
  }
};

export default connection;
