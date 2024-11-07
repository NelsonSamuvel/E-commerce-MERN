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

export { createUser };
