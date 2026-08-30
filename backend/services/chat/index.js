import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

const PORT = process.env.PORT || 5001

const app = express()
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser())
app.get("/", (req, res) => {
    res.json({ message: "hello from chat" })
})

app.listen(PORT, () => {
    console.log(`Chat started at port:${PORT}`)
    connectDB()
})