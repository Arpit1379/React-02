import { Schema, model } from "mongoose";

const UserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
   
} ,{timestamps:true})

const User=model('User',UserSchema);

export default User;
