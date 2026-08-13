import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

const PORT=process.env.PORT

const app=express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser())
app.use("/auth",proxy(process.env.AUTH_SERVICE))

app.get("/",(req,res)=>{
    res.json({message:"hello from gateway"})
})
app.listen(PORT,()=>{
    console.log(`gateway started at port:${PORT}`)
})