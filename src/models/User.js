import { mongoose , Schema, model} from "mongoose";

const User = new Schema({
    firstName : {
        type : String,
        require : true,
        minLength : 4,
        trim : true
    },
    lastName : {
        type : String,
        require : true,  
        minLength : 4,
        trim : true
    },
    email : {
        type : String,
        require : true,  
        trim : true,
        lowercase : true,
        minLength : 4
    },
    password : {
        type : String,
        require : true,
        minLength : 4
    },
    age : {
        type : Number,
        require : true,
        min : 18
    },
    about : {
        type : String,
        require : false,
        maxLength : 50,
        trim : true
    },
    followers : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

},{timestamps : true});

export default model("User",User);