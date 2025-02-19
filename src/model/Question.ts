import mongoose, {Schema, Document, Mongoose, mongo} from 'mongoose';

export interface Question extends Document{
    questionId: string,
    content: string,
    category: string,
    difficulty: string,
    tags: string,
    createdAt: Date
}

const QuestionSchema = new mongoose.Schema(
    {
        content:{
            type: String,
            required: [true, "Content is required"]
        },
        category:{
            type: String,
            required: [true, "Category is required"]
        },
        difficulty:{
            type: String,
            enum:["easy","medium","hard"],
            required: [true, "question must have difficulty level"]
        },
    },{
        timestamps: true
    }
)

const QuestionModel = (mongoose.models.Questions as mongoose.Model<Question>) || (mongoose.model<Question>("Question", QuestionSchema));
export default QuestionModel;