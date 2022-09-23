import db from "../Database/MongoDB.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import { choiceSchema } from "../Schemas/choiceSchema.js";

export async function postChoice (req, res) {
    const { title, pollId } = req.body;

    const pollVerify = await db
    .collection('poll')
    .findOne({_id: new ObjectId(pollId)});

    if(pollVerify  === null) {
        return res.status(404).send("Poll not exist");
    }
    const validate = choiceSchema.validate({ title, pollId });

    if(validate.error) {
        return res.status(422).send("Title is required");
    }

    const titleVerify = await db
    .collection('choice')
    .findOne({title: title, pollId: pollId});

    if(titleVerify !== null) {
        return res.status(409).send("Title is already in use");
    }

    const expired = dayjs().isBefore(pollVerify.expiredAt, 'minute');
    if(!expired) {
        return res.status(403).send("Poll expired");
    }

    try {
        await db
        .collection('choice')
        .insertOne({
            title,
            pollId
        });

        return res.status(201).send("Sucess creating a choice");
    }

    catch(error) {
        console.log(error);
    }
}