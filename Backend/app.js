import express from 'express';
import cors from "cors";
import authRoute from './Routes/authRoute.js';
import productRoute from './Routes/productRoute.js';
import cookieParser from 'cookie-parser'; 
import connection from './config/database.js';

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/product',productRoute);

connection();

