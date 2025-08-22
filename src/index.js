// import mongoose from "mongoose";
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: "./env"
})
connectDB()



























// import { DB_NAME } from "../CONSTANT.js";  




/*
(async () => {
    try{
mongoose.connect('${process.env.MONGODB_URI}')
    } catch(error){
            
        console.error("ERROR: ",error)
        throw err
    }
})();
*/

