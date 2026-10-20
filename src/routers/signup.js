import bcrypt from "bcrypt";
import validator from "validator";
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signupRouter = express.Router();

signupRouter.post("/signup",async (req,res)=>{
    try{

        const useravailable = await User.findOne({email : req.body.email});

        const allowed = ["userName", "firstName", "lastName", "age", "email", "password"];
        
        allowed.forEach((fields)=>{
            if(!Object.keys(req.body).includes(fields)){
                throw new Error ("Missing field");
            }
        })


        if(useravailable){
            throw new Error("User already exist");
        }


        let emailverified = validator.isEmail(req.body.email);
        let passwordverified = validator.isStrongPassword(req.body.password);



        if(!emailverified)
            throw new Error("Email is not valid");
        
        if(!passwordverified)
            throw new Error("Enter a Strong Password");
        
        if(req.body.age<18)
            throw new Error("User must be atleast 18 years old");
        
        if(req.body.about && req.body.about.length>50)
            throw new Error("About is exceeding the limit");
        
        const password = req.body.password;
        const hashed = await bcrypt.hash(password,10)
        req.body.password = hashed;
        const user = new User(req.body);
        await user.save();

        const token = jwt.sign(
            {_id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        )

        
        res
            .cookie("token",token)
            .send("signed up")
    }
    catch(err){
        res
            .status(400)
            .json({
                message : `error : ${err.message}`
            })
    }
})

export default signupRouter;