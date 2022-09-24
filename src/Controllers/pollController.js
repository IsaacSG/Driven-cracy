import db from "../Database/MongoDB.js";
import { pollSchema } from "../Schemas/pollSchema.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";


export async function postPoll (req, res) {
    let { title, expiredAt } = req.body;
    if(expiredAt === "" || expiredAt === undefined) {
        expiredAt = dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm'); 
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
        console.log(error);
    }
}

export async function getPoll(req, res) {
    try {
        const polls = await db
        .collection('poll')
        .find()
        .toArray();

        return res.status(200).send(polls);
    }

    catch(error) {
        console.log(error);
    }
}

export async function getChoicefromPoll(req, res) {
    const id = req.params.id;

    const pollVerify = await db
    .collection('poll')
    .findOne({_id: new ObjectId(id)});

    if(pollVerify === null) {
        return res.status(404).send("Poll not exist");
    }

    try {
        const choices = await db
        .collection('choice')
        .find({pollId: (id)})
        .toArray();

        return res.status(200).send(choices);
    }
    catch(error) {
        console.log(error);
    }
}

export async function getResult(req, res) {
    const { id } = req.params;

    const pollVerify = await db
    .collection('poll')
    .findOne({_id: new ObjectId(id)});

    if (!pollVerify) {
        return res.status(404).send("Poll not existe");
    }

    const choices = await db
    .collection('choice')
    .find({ pollId: id})
    .toArray();

    console.log(choices);

    let mostVoted = 0;
    let mostVotedTitle = "";

    for (let i = 0; i < choices.length; i++) {
        let votes = choices[i].vote;

        if (votes > mostVoted) {
          mostVoted = votes;
          mostVotedTitle = choices[i].title;
        }

      }

        
  try {
    const result = [];
    result.push({pollVerify,result: {title: mostVotedTitle, votes: mostVoted}})
    res.status(200).send(result);
  } 
  catch(error) {
    console.log(error);
  }
}