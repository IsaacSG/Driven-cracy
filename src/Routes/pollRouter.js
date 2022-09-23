import { Router } from "express";
import { postPoll, getPoll, getChoicefromPoll } from "../Controllers/pollController.js";

const router = Router();

router.post("/poll", postPoll);
router.get("/poll", getPoll);
router.get("/poll/:id/choice", getChoicefromPoll);

export default router;