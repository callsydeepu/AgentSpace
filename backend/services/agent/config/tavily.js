import axios from "axios"

export const searchTool = {
    invoke: async ({ query }) => {
        try {
            const apiKey = process.env.TAVILY_API_KEY
            if (!apiKey) {
                console.log("TAVILY_API_KEY not configured in .env")
                return { results: [], images: [] }
            }
            const { data } = await axios.post("https://api.tavily.com/search", {
                api_key: apiKey,
                query,
                include_images: true,
                max_results: 5
            })
            return data
        } catch (error) {
            console.error("Tavily search error:", error.message)
            return { results: [], images: [] }
        }
    }
}
