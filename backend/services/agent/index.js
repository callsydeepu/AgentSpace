import "dotenv/config"
import express from "express"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/agent.route.js"

const PORT = process.env.PORT || 8003

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())

app.use("/", router)
app.get("/", (req, res) => {
    res.json({ message: "hello from agent" })
})

app.listen(PORT, () => {
    console.log(`Agent started at port:${PORT}`)
    connectDB()
})
