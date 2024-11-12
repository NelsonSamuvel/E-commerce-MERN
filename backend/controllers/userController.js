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

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const currentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await byCrypt.genSalt(10);
      user.password = await byCrypt.hash(req.body.password, salt);
    }
    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      res.send("Cannot delete Admin");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: `User ${user.username} deleted successfully` });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin || user.isAdmin);

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  currentUserProfile,
  updateProfile,
  deleteUser,
  getUserById,
  updateUserById,
};
