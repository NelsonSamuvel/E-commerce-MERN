import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import byCrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send("User already exists");

  const salt = await byCrypt.genSalt(10);
  const hashedPassword = await byCrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid User data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    const isPasswordValid = await byCrypt.compare(password, existUser.password);

    if (isPasswordValid) {
      generateToken(res, existUser._id);

      res.status(200).json({
        id: existUser._id,
        username: existUser.username,
        email: existUser.email,
        isAdmin: existUser.isAdmin,
      });

      return;
    }
    return res.status(400).send("Invalid Password");
  }
  return res.send(400).send("User not found");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export { createUser, loginUser, logoutUser };
