import mongoose,{Schema, Document} from "mongoose";

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
}

const UserSchema:Schema<User> = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isAdmin:{
        type: Boolean,
    },
},{
    timestamps: true
})

// userId
// name
// email
// password
// is admin
// preparing for

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

  export default UserModel;