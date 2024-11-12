import express from "express";
import {
  createUser,
  currentUserProfile,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  updateProfile,
  updateUserById,
} from "../controllers/userController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticateUser, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticateUser, currentUserProfile)
  .put(authenticateUser, updateProfile);

router
  .route("/:id")
  .delete(authenticateUser, authorizeAdmin, deleteUser)
  .get(authenticateUser, authorizeAdmin, getUserById)
  .put(authenticateUser, authorizeAdmin, updateUserById);

export default router;
