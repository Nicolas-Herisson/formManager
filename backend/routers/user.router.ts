import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";

const userRouter = Router();

userRouter.post("/user", userController.createUser);
userRouter.get("/users", userController.getUsers);
userRouter.get("/users/me", authenticateAndCsrf, userController.getMe);
userRouter.get("/users/:id", userController.getUser);
userRouter.put("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);

export default userRouter;
