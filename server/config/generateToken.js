import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.nextTick.TokenSecrate, {
    expiresIn: "7d",
  });
};

export default generateToken;
