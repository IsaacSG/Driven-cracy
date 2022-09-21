import db from "../Database/MongoDB.js";
import { pollSchema } from "../Schemas/pollSchema.js";
import dayjs from "dayjs";


export async function postPoll (req, res) {
    let { title, expiredAt } = req.body;
    console.log(expiredAt);
    if(expiredAt === "" || expiredAt === undefined) {
        expiredAt = dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm'); 
        console.log(expiredAt);
    }
    const validate = pollSchema.validate({ title, expiredAt });

    if(validate.error) {
        return res.status(422).send("Title is required");
    }

    try {
        await db
        .collection('poll')
        .insertOne({
            title,
            expiredAt
        });

        return res.status(201).send("Success creating a poll");
    }

    catch(error) {

    }
}