import { Router } from "express";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";
import * as authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/logout", authenticateAndCsrf, authController.logout);
authRouter.post("/refresh", authenticateAndCsrf, authController.refresh);

export default authRouter;