import api from "../../utils/axios.js"

const logOut = async () => {
    try {
        const { data } = await api.post("/api/auth/logout")
        return data
    } catch (error) {
        console.error("Logout error:", error)
        return null
    }
}

export default logOut
