import { Router } from "express";
import { postChoice } from "../Controllers/choiceController.js";

const router = Router();

router.post("/choice", postChoice);

export default router;