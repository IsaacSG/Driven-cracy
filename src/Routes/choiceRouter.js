import { Router } from "express";
import { postChoice, postVote } from "../Controllers/choiceController.js";

const router = Router();

router.post("/choice", postChoice);
router.post("/choice/:id/vote", postVote);

export default router;