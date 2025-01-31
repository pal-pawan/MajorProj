import mongoose,{Schema, Document} from "mongoose";

export interface User extends Document {
    userId: string,
    username: string,
    password: string,
    role: string,
    preferences: string,
    progress: string,
    createdAt: Date
}



// userId
// name
// email
// password
// role
// preferences
// createdAt
// progress

