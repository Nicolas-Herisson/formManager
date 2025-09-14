import { Router } from "express";
import * as responseController from "../controllers/response.controller.js";
import { sanitizer } from "../middlewares/sanitizer.mw.js";

const responseRouter = Router();

responseRouter.post("/:form_id/responses", sanitizer, responseController.createResponse);
responseRouter.get("/:form_id/responses", responseController.getResponses);
responseRouter.get("/:form_id/responses/:response_id", responseController.getResponse);
responseRouter.delete("/:form_id/responses/:response_id", responseController.deleteResponse);
responseRouter.delete("/:form_id/responses", responseController.deleteResponsesByFormId);
responseRouter.put("/:form_id/responses/:response_id", sanitizer, responseController.updateResponse);

export default responseRouter;
