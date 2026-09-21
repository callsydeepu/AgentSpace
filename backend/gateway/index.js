import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./controllers/user.controller.js"
import protect from "./middleware/auth.middleware.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
import morgan from "morgan"
dotenv.config()

const PORT=process.env.PORT

const app=express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE)) //attach with header
app.use("/api/agent",protect,proxyWithHeader(process.env.AGENT_SERVICE)) //attach with header

app.get("/api/me", protect, getCurrentUser) //first goes to {protect} next to {getCurrentUser} controller

app.get("/",(req,res)=>{
    res.json({message:"hello from gateway"})
})
app.listen(PORT,()=>{
    console.log(`gateway started at port:${PORT}`)
})