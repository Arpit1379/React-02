import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

export  const authRegister=async(req,res)=>{
    const {username,email,password,role}=req.body;
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({username,email,password:hashedPassword,role});
        await newUser.save();
        res.status(201).send("Registration Done!");
    }
    catch(error){
        res.status(500).send(" Registration Not Done!");
    }
}

export const authLogin=async(req,res)=>{
    const {username,email,password,role}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            const verifyUser=await bcrypt.compare(user.password,password);
            if(verifyUser){
                const token=jwt.sign({id:verifyUser._id},"arpitkalra",{expiresIn:'1h'});
                res.json({token});
            }
        }
        res.status(201).send("Login Done!");
    }
    catch(error){
        res.status(500).send(" Login Not Done!");
    }
}

export const authForgetPassword=async(req,res)=>{
        const {email}=req.body;
        const user=await User.findOne({email});
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Generate reset token with JWT
         const resetToken = jwt.sign({ id: user._id }, 'arpitkalra', { expiresIn: '1h' });
         user.resetPasswordToken = resetToken;
         user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
         await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your preferred email service
            auth: {
                user: 'arpitkalra15@gmail.com',
                pass: 'Kalra@1379' // For Gmail, it's better to use OAuth2
            }
        });

        const mailOptions = {
            from: 'arpitkalra15@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${req.headers.host}/reset-password/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.error('sendMail failed', err);
                return res.status(500).send('Error sending the password reset email.');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('An e-mail has been sent to ' + user.email + ' with further instructions.');
            }
        });
}


export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, 'arpitkalra');
      const user = await User.findOne({
        _id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Check if token has not expired
      });
  
      if (!user) {
        return res.status(400).send('Invalid or expired reset token.');
      }
  
      user.password = newPassword;
      user.resetPasswordToken = undefined; // Clear the reset token
      user.resetPasswordExpires = undefined; // Clear the expiration
      await user.save();
  
      res.send('Password has been reset successfully.');
    } catch (error) {
      res.status(500).send('Server error.');
    }
  };
  