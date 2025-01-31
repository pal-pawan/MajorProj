import mongoose, {Schema, Document} from "mongoose";

export interface Answer extends Document{
    userId: string,
    questionId: string,
    content: string,
    evaluation: string,
    createdAt: Date
}
// userId
// questionId
// content
// evaluation
// timestamp