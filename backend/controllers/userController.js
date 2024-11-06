import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send("User already exists");

  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid User data" });
  }
});

export { createUser };
