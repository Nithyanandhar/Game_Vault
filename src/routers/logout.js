import express from "express";
import auth from "../utils/auth.js"


const logoutRouter = express.Router();

logoutRouter.use("/logout",auth,(req,res)=>{
    
    res
        .cookie("token","",{expires : new Date (0)})
        .json({
            message : "logged out !"
        })
})



export default logoutRouter;
