import { Router } from "express";
import * as responseController from "../controllers/response.controller.js";
import { sanitizer } from "../middlewares/sanitizer.mw.js";
import isPublished from "../middlewares/is_published.mw.js";

const responseRouter = Router();

responseRouter.post("/:form_id/responses", sanitizer, isPublished, responseController.createResponse);
responseRouter.get("/:form_id/responses", responseController.getResponses);
responseRouter.get("/:form_id/responses/:response_id", responseController.getResponse);
responseRouter.delete("/:form_id/responses/:response_id", responseController.deleteResponse);
responseRouter.delete("/:form_id/responses", responseController.deleteResponsesByFormId);
responseRouter.put("/:form_id/responses/:response_id", sanitizer, isPublished, responseController.updateResponse);

export default responseRouter;
