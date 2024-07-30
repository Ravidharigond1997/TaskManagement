import jwt from "jsonwebtoken";
import dotenv from "dotenv";

let token_secrate = process.nextTick.TOKEN_SECRATE;

const generateToken = (id) => {
  return jwt.sign({ id }, token_secrate, {
    expiresIn: "7d",
  });
};

export default generateToken;
