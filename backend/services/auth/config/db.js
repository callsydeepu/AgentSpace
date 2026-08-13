import mongoose from "mongoose"
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("db connected")
    }catch(error){
        console.log(`db error ${error}`)
    }
}

export default connectDB