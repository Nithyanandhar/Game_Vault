import express from "express";
import connectDB from "./config/database.js";
import User from "./models/User.js";

const app = express();

app.use("/",(req,res)=>{
    res.json({
        message : "hello"
    })
})


connectDB()
    .then(()=>{ 
        app.listen(3000,()=>{
            console.log(User);
        });
    })

    .catch((err)=>{
        console.log("error: "+err);
    })


