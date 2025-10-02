import express from "express";
import * as imageController from "../controllers/image.controller";
import uploadMiddleware from "../middlewares/uploadImage.mw";

const imageRouter = express.Router();

imageRouter.post(
  "/upload-image",
  uploadMiddleware,
  imageController.uploadImage
);

imageRouter.post("/delete-image", imageController.deleteImageAndDirectory);

export default imageRouter;
