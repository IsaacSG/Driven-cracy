import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log(`Listen from ${Port}`);
})