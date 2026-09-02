import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

const PORT = process.env.PORT || 8003

const app = express()
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser())
app.get("/", (req, res) => {
    res.json({ message: "hello from agent" })
})

app.listen(PORT, () => {
    console.log(`Agnet started at port:${PORT}`)
    connectDB()
})