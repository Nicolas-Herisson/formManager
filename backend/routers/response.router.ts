import { Router } from "express";
import * as responseController from "../controllers/response.controller.js";
import { sanitizer } from "../middlewares/sanitizer.mw.js";
import isPublished from "../middlewares/is_published.mw.js";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";

const responseRouter = Router();

// public
responseRouter.post("/:form_id/responses", sanitizer, isPublished, authenticateAndCsrf, responseController.createResponse);
responseRouter.get("/:form_id/responses/:response_id", responseController.getResponse);
responseRouter.put("/:form_id/responses/:response_id", sanitizer, isPublished, responseController.updateResponse);

//private
responseRouter.get("/:form_id/responses", authenticateAndCsrf, responseController.getResponses);
responseRouter.delete("/:form_id/responses/:response_id", authenticateAndCsrf, responseController.deleteResponse);
responseRouter.delete("/:form_id/responses", authenticateAndCsrf, responseController.deleteResponsesByFormId);
export default responseRouter;
