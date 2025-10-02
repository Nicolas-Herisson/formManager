import express from "express";
import * as imageController from "../controllers/image.controller";
import uploadMiddleware from "../middlewares/uploadImage.mw";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";

const imageRouter = express.Router();

imageRouter.post(
  "/upload-image",
  authenticateAndCsrf,
  uploadMiddleware,
  imageController.uploadImage
);

imageRouter.post(
  "/delete-image",
  authenticateAndCsrf,
  imageController.deleteImageAndDirectory
);

export default imageRouter;
