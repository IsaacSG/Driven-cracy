import { Router } from "express";
import { postPoll, getPoll, getChoicefromPoll, getResult } from "../Controllers/pollController.js";

const router = Router();

router.post("/poll", postPoll);
router.get("/poll", getPoll);
router.get("/poll/:id/choice", getChoicefromPoll);
router.get("/poll/:id/result", getResult);

export default router;