import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const PORT=process.env.PORT;
const MONGODB_URL=process.env.MONGODB_URL;
const app=express();


const connection=()=>{
    mongoose.connect(MONGODB_URL).then(()=>{
        console.log("Your Database is connected");
        app.listen(PORT,()=>{
            console.log(`Your Server is Ready at ${PORT}`);
        })
    }).catch((error)=>{
        console.log(error);
    })
}

export default connection;
