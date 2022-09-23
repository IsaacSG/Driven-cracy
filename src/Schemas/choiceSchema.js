import joi from "joi";

export const choiceSchema = joi.object({
    title: joi.string().required().min(2),
    pollId: joi.string().required().min(5)
});