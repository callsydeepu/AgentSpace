import axios from "axios"

export const getMemory = async (conversationId) => {
    try {
        if (!conversationId) return []
        const response = await axios.get(`${process.env.CHAT_SERVICE}/get-messages/${conversationId}`)
        return response.data || []
    } catch (error) {
        console.log("getMemory error:", error.message)
        return []
    }
}
