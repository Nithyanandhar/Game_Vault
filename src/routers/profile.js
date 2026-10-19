import express from "express";
import mongoose from "mongoose";

const profileRouter = express();
    
profileRouter.get("/profile/:id",(req,res)=>{
    try{
        const data = req.body;

        res.json({
            message: "User Found!",
            data
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