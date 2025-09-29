import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";

const userRouter = Router();

// private
userRouter.get("/users/me", authenticateAndCsrf, userController.getMe);
userRouter.get("/users/roles", authenticateAndCsrf, userController.getRoles);
userRouter.post("/user", authenticateAndCsrf, userController.createUser);
userRouter.get("/users", authenticateAndCsrf, userController.getUsers);
userRouter.get("/users/:id", authenticateAndCsrf, userController.getUser);
userRouter.put("/users/:id", authenticateAndCsrf, userController.updateUser);
userRouter.delete("/users/:id", authenticateAndCsrf, userController.deleteUser);

// public

userRouter.patch("/users/:id/reset-password", userController.resetPassword);

export default userRouter;
