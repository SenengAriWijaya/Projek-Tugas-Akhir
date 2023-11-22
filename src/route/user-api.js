import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware, checkRole } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();

userRouter.get(
  "/users/current",
  authMiddleware,
  checkRole("USER"),
  userController.getUser
);
userRouter.patch(
  "/users/current",
  authMiddleware,
  checkRole("USER"),
  userController.updateUser
);
userRouter.delete(
  "/users/logout",
  authMiddleware,
  checkRole("USER"),
  userController.logoutUser
);

export { userRouter };
