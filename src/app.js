import express from "express";
import connectDB from "./config/database.js";
import User from "./models/User.js";
import signupRouter from "./routers/signup.js";
import cookieParser from "cookie-parser";
import loginRouter from "./routers/login.js";


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/",signupRouter)
app.use("/",loginRouter)
// app.use("/",profile)
// app.use("/",request)


connectDB()
    .then(()=>{ 
        app.listen(3000,()=>{
            console.log(User);
        });
    })

    .catch((err)=>{
        console.log("error: "+err);
    })


