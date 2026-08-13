import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import router from "./routes/auth.route.js"
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
app.use("/", router)

app.get("/", (req, res) => {
    res.json({ message: "hello from auth" })
})

app.listen(PORT, () => {
    console.log(`Auth started at port:${PORT}`)
    connectDB()
})