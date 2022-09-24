import db from "../Database/MongoDB.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import { choiceSchema } from "../Schemas/choiceSchema.js";

export async function postChoice (req, res) {
    const { title, pollId } = req.body;
    const vote = 0;

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
            pollId,
            vote
        });

        return res.status(201).send("Sucess creating a choice");
    }

    catch(error) {
        console.log(error);
    }
}

export async function postVote(req, res) {
    const id = req.params.id;
    const dateNow = dayjs().format("YYYY-MM-DD HH:mm");


    const choiceVerify = await db
    .collection('choice')
    .findOne({_id: new ObjectId(id)});

    if(choiceVerify === null) {
        return res.status(404).send("Choice not exist")
    }

    const expiredAt = await db
    .collection('poll')
    .findOne({_id: new ObjectId(choiceVerify.pollId)});

    const expired = dayjs().isBefore(expiredAt.expiredAt, 'minute');

    if(!expired) {
        return res.status(403).send("Poll expired")
    }


    try {
        const vote = await db
        .collection('choice')
        .updateOne( 
            { _id: ObjectId(id) },
            { $inc: {vote: 1}}
        );
    
        return res.status(201).send("Vote inserted")

    }

    catch(error) {
        console.log(error);
    }
}