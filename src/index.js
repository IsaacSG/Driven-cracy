import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const Port = process.env.PORT || 5000;

app.get("/status", (req, res) => {
    return res.send("ok");
})

app.listen(Port, () => {
    console.log(`Listen from ${Port}`);
})