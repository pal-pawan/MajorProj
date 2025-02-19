import mongoose,{Schema, Document} from "mongoose";

export interface PrepRoles extends Document {
    roles: string
}

const PrepRoleSchema:Schema<PrepRoles> = new mongoose.Schema({
    roles:{
        type: String,
        unique: true
    }
})

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    preparingFor: PrepRoles[]
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
    preparingFor:[PrepRoleSchema]
},{
    timestamps: true
})


const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

  export default UserModel;