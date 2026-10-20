import jwt from "jsonwebtoken";
import "dotenv/config.js";

const auth = (req,res,next) => {
    try{
        const token = req.cookies.token;

        if(!token){
            res
                .status(400)
                .json({
                    message : "log in to proceed further"
                })
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        
        console.log("inside auth");
        next();
    }
    catch(err){
        res
            .status(400)
            .json({
                message : "log in to proceed further"
            })
    }
}

export default auth;