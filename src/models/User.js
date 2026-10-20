import { Schema, model} from "mongoose";

const User = new Schema({
    userName : {
        type : String,
        require : true,
        minLength : 4,
        trim : true,
        unique : true
    },
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
        minLength : 4,
        unique:true
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
            type : [String],
            ref: "User"
        }
    ],
    following : [
        {
            type:[String],
            ref: "User"
        }
    ],
    completed : [String],
    wishlist : [String]

},{timestamps : true});

export default model("User",User);