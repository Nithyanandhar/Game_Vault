import express from "express";
import User from "../models/User.js"
import auth from "../utils/auth.js";

const profileRouter = express();
    
profileRouter.patch("/profile/edit",auth,async(req,res)=>{
    try{
        
        const data = await User.findById(req.user._id);
        
        if(!data){
            throw new Error ("Username not found");
        }
        
        const allowedFields = ["firstName", "lastName", "age", "about"];
        
        let update = {}
        
        Object.keys(req.body).forEach((field)=>{
            if(allowedFields.includes(field)){
                update = {
                    ...update , [field] : req.body[field]
                }
            }
        })

        const dbupdate = await User.findByIdAndUpdate(
            req.user._id,
            { $set: update },
            {
                new: true,
                runValidators: true
            }
        );
        

        res
            .json({
                message: "User info updated!",
                dbupdate,
                sent: req.body
            })
    }
    catch(err){
        res
            .status(404)
            .json({
                message : "User not found"
            })
    }
})

profileRouter.get("/profile/:userName",auth,async(req,res)=>{
    try{
        
        const data = await User.findOne({userName : req.params.userName});
        
        console.log(req);
        if(!data){
            throw new Error ("Username not found");
        }
        res
            .json({
                message: "User Found!",
                data,
                sent: req.body
            })
    }
    catch(err){
        res
            .status(404)
            .json({
                message : "User not found"
            })
    }
})


export default profileRouter;