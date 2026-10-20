import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config.js"

const loginRouter = express.Router();

loginRouter.post("/login",async (req,res)=>{
    try{
        let userAvailable = await User.findOne({email : req.body.email});
    
        if(!userAvailable){
            throw new Error ("User not Found");
        }

        let isPassword = await bcrypt.compare (req.body.password , userAvailable.password);

        if(!isPassword)
            throw new Error("Wrong Password");

        const token = jwt.sign(
            {_id : userAvailable._id},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        )

        res
            .cookie("token",token)
            .json({
                message : "logged in successful!",
                userAvailable
            })

    }
    catch(err){
        res
            .json({
                message : `error : ${err}`
            })
            .status(404)
    }
})

export default loginRouter;