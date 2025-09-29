import express from "express";
import * as inviteController from "../controllers/invite.controller";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";

const inviteRouter = express.Router();

inviteRouter.get("/invites", authenticateAndCsrf, inviteController.getInvites);

inviteRouter.get(
  "/invites/:id",
  authenticateAndCsrf,
  inviteController.getInvite
);

inviteRouter.post("/invites", authenticateAndCsrf, inviteController.invite);

inviteRouter.delete(
  "/invites/:id",
  authenticateAndCsrf,
  inviteController.deleteInvite
);

export default inviteRouter;
