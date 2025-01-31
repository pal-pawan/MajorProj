import mongoose, {Schema, Document} from 'mongoose';

export interface Question extends Document{
    questionId: string,
    content: string,
    category: string,
    difficulty: string,
    tags: string,
    createdAt: Date
}


// questionId
// content
// category
// difficulty
// tags
// createdAt