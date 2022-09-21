import { Router } from "express";
import { postPoll } from "../Controllers/pollController.js";

const router = Router();

router.post("/poll", postPoll);

export default router;