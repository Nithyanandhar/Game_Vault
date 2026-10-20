import "dotenv/config";
import express from "express";
import auth from "../utils/auth.js";
import User from "../models/User.js"

console.log("hello");
const gamefetch = async ()=>{
    try{
        const response = await fetch (process.env.GAME_URL);
        if(!response.ok){
            throw new Error ("Can't find the api")
        }
        let game = await response.json();
        return game;
    }
    catch(err){
        console.log("ERROR : "+err)
    }
}

const gamesRouter = express.Router();

gamesRouter.post("/games/:list",auth,async(req,res)=>{
    
    try{
        let listtype = req.params.list;
        
        let game =await gamefetch();
        console.log(game);

        const found = game.results.some((platform) =>
            platform.games.some((item) =>
                item.name.toLowerCase() === req.body.game.toLowerCase()
            )
        );
        if(!found)
            throw new Error("game not found");

        let updateduser = await User.findByIdAndUpdate(req.user._id,
            {
                $addToSet: {
                    [listtype]: req.body.game
                }
            }
            
        );
        res
            .json({
                updateduser
            })

    }
    catch(err){

        res
            .status(404)
            .json({
                message: "game not found"
            })
    }
})

export default gamesRouter;




