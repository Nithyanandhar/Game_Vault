import {Schema, model} from "mongoose";

const Followers = new Schema({
    fromUser :{
        type : String,
        require : true
    },
    toUser : {
        type : String,
        require : true    
    }
},{timestamps : true})

export default model("Followers",Followers);

