// import mongoose from "mongoose";
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({       //dotenv command is used to extract something from .env file
    path: "./env"
})
connectDB()
.then(() => {
    app.listen(process.env.PORT||8000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);

    })
})
.catch((err) => {
    console.error("mongo DB connection failed !!!", err);

})


























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

