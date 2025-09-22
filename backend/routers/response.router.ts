import { Router } from "express";
import * as responseController from "../controllers/response.controller.js";
import { sanitizer } from "../middlewares/sanitizer.mw.js";
import isPublished from "../middlewares/is_published.mw.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.mw";

const responseRouter = Router();

// public
responseRouter.post("/:form_id/responses", sanitizer, isPublished, responseController.createResponse);
responseRouter.get("/:form_id/responses/:response_id", responseController.getResponse);
responseRouter.put("/:form_id/responses/:response_id", sanitizer, isPublished, isAuthenticated, responseController.updateResponse);

//private
responseRouter.get("/:form_id/responses", isAuthenticated, responseController.getResponses);
responseRouter.delete("/:form_id/responses/:response_id", isAuthenticated, responseController.deleteResponse);
responseRouter.delete("/:form_id/responses", isAuthenticated, responseController.deleteResponsesByFormId);
export default responseRouter;
