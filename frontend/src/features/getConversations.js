
import api from "../../utils/axios"
export const getConversations=async()=>{
    try {
        const {data}=await api.get("/api/chat/get-conversations")
        return data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return []
        }
        console.log(error)
        return []
    }
} 
