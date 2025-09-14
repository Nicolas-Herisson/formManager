import { Router } from "express";
import * as formController from "../controllers/form.controller.js";
import sanitizer from "../middlewares/sanitizer.mw.js";

const formRouter = Router();

formRouter.get('/forms', formController.getForms);
formRouter.post('/forms', sanitizer, formController.createForm);
formRouter.get('/forms/:id', formController.getForm);
formRouter.put('/forms/:id', sanitizer, formController.updateForm);
formRouter.delete('/forms/:id', formController.deleteForm);

export default formRouter;