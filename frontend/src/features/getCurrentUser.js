import api from "../../utils/axios.js"

const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/api/me")
        return data
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            return null
        }
        console.log(error)
        return null
    }
}

export default getCurrentUser