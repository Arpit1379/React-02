import express from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token=req.headers?.authorization.split(' ')[1].trim();
    if (!token) {
        return res.status(403).json({ message: "Token is required for authentication" });
    }
    const decoded = jwt.verify(token, "arpitkalra");
    req.user = decoded; 
    next();
}