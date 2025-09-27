import { Router } from "express";
import * as formController from "../controllers/form.controller";
import { sanitizer } from "../middlewares/sanitizer.mw";
import { authenticateAndCsrf } from "../middlewares/isAuthenticated.mw";

const formRouter = Router();

//public
formRouter.get("/forms/:id", formController.getForm);

//private
formRouter.get("/forms", authenticateAndCsrf, formController.getForms);
formRouter.post(
  "/forms",
  sanitizer,
  authenticateAndCsrf,
  formController.createForm
);
formRouter.put(
  "/forms/:id",
  sanitizer,
  authenticateAndCsrf,
  formController.updateForm
);
formRouter.delete("/forms/:id", authenticateAndCsrf, formController.deleteForm);
formRouter.put(
  "/forms/:id/publish",
  authenticateAndCsrf,
  formController.publishForm
);

export default formRouter;
