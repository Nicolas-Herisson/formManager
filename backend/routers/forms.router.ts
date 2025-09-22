import { Router } from "express";
import * as formController from "../controllers/form.controller";
import { sanitizer } from "../middlewares/sanitizer.mw";
import { isAuthenticated } from "../middlewares/isAuthenticated.mw";

const formRouter = Router();

//public
formRouter.get('/forms/:id', formController.getForm);

//private
formRouter.get('/forms', isAuthenticated, formController.getForms);
formRouter.post('/forms', sanitizer, isAuthenticated, formController.createForm);
formRouter.put('/forms/:id', sanitizer, isAuthenticated, formController.updateForm);
formRouter.delete('/forms/:id', isAuthenticated, formController.deleteForm);
formRouter.put('/forms/:id/publish', isAuthenticated, formController.publishForm);

export default formRouter;