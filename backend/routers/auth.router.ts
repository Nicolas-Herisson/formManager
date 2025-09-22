import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.mw";
import * as authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/logout", isAuthenticated, authController.logout);
authRouter.post("/refresh", isAuthenticated, authController.refresh);

export default authRouter;