import express from "express";
import auth from "../utils/auth.js";
import Followers from "../models/Followers.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const requestRouter = express.Router();

requestRouter.post("/request/:touser",auth,async(req,res)=>{
    try{
        let touser = await User.findOne({userName : req.params.touser});
        let fromuser = await User.findOne({_id : req.user._id});

        if(!touser)
            throw new Error ("To user not Found!");

        const data = new Followers({
            fromUser : fromuser,
            toUser : touser
        })

        await data.save();

        await User.findByIdAndUpdate(req.user._id,
            {$set :{following : [...fromuser.following,req.params.touser]}}
        )

        await User.findByIdAndUpdate(touser._id,
            {$set :{followers : [...touser.followers,fromuser.userName]}}
        )

        res
            .json({
                message : `${fromuser.userName} follows ${touser.userName}`,
                fromUser: fromuser,
                touser : touser
            })

    }
    catch(err){
        res
            .status(404)
            .json({
                message : `error :${err}`
            })
    }
})

export default requestRouter;