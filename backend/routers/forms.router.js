import { Router } from "express";
import formController from "../controllers/formController";

const router = Router();

router.get('/forms', formController.getForms);
router.post('/forms', formController.createForm);
router.get('/forms/:id', formController.getForm);
router.put('/forms/:id', formController.updateForm);
router.delete('/forms/:id', formController.deleteForm);

export default router;