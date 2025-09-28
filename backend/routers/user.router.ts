import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";

const userRouter = Router();

// private
userRouter.get("/users/me", authenticateAndCsrf, userController.getMe);

userRouter.post(
  "/users/invite",
  authenticateAndCsrf,
  userController.inviteUser
);
userRouter.get("/users/roles", authenticateAndCsrf, userController.getRoles);

// public
userRouter.post("/user", userController.createUser);
userRouter.get("/users", userController.getUsers);
userRouter.get("/users/:id", userController.getUser);
userRouter.put("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);

export default userRouter;
