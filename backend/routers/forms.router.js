import { Router } from "express";
import * as formController from "../controllers/form.controller.js";

const formRouter = Router();

formRouter.get('/forms', formController.getForms);
formRouter.post('/forms', formController.createForm);
formRouter.get('/forms/:id', formController.getForm);
formRouter.put('/forms/:id', formController.updateForm);
formRouter.delete('/forms/:id', formController.deleteForm);

export default formRouter;