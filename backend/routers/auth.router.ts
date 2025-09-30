import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.patch("/:isInvite/reset-password", authController.resetPassword);

export default authRouter;
