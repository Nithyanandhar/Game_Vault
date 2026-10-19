import mongoose from "mongoose";
import "dotenv/config.js";

const connectDB = ()=>{
    return mongoose.connect(process.env.MONGO_URI);
}

export default connectDB;