import jwt from "jsonwebtoken";
import User from "../module/user.js";

const JWT_SECRATE = process.env.TOKEN_SECRET;

const verfiyUser = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decode = jwt.decode(token, JWT_SECRATE);
        req.user = await User.findById(decode.id).select("-password");
        next();
      } catch (error) {
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not  authorized, no token");
    }
  } catch (error) {
    console.log(error);
  }
};

export default verfiyUser;
