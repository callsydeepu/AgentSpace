
import api from "../../utils/axios"
export const createConversation=async()=>{
    try {
        const {data}=await api.get("/api/chat/create-conversation")
        return data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return null
        }
        console.log(error)
        return null
    }
} 