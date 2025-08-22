import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true    // check this
}))

app.use(express.json({ limit: "16kb" }))     // used to limit the express.json payload size
app.use(express.urlencoded({ extended: true, limit: "16kb" }))  // used to parse urlencoded data
app.use(express.static("public"))  // used to serve static files from the public directory
app.use(cookieParser())  // used to parse cookies from the request


export {app}