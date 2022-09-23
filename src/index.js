import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRouter from "./Routes/pollRouter.js";
import choiceRouter from "./Routes/choiceRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const Port = process.env.PORT || 5000;

app.use(pollRouter);
app.use(choiceRouter);

app.get('/status', (req, res) => {
    return res.send("ok");
})

app.listen(Port, () => {
    console.log(`Listen from ${Port}`);
})