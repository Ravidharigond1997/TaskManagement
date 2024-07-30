// controller/userController.js
import User from "../module/user.js";
import { hashPassword, comparePassword } from "../helper/hashPassword.js";
import generateToken from "../config/generateToken.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, rollNo, address, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashPasswords = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      address,
      rollNo,
      password: hashPasswords,
      isAdmin,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    const comparedPassword = await comparePassword(password, user.password);

    if (!comparedPassword) {
      return res.status(400).send({
        success: false,
        message: "Please enter the correct password",
      });
    }

    const token = generateToken(user._id);

    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
