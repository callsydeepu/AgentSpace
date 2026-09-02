import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export const getModel = async (agent) => {
    switch (agent) {
        case "chat":
        case "search":
        case "coding":
            return new ChatGroq({
                model: "openai/gpt-oss-120b",
                apiKey: process.env.GROQ_API_KEY
            });
        case "imageAnalyzer":
            return new ChatGoogleGenerativeAI({
                model: "gemini-2.5-flash",
                apiKey: process.env.GOOGLE_API_KEY
            });
        default:
            return new ChatGroq({
                model: "openai/gpt-oss-120b",
                apiKey: process.env.GROQ_API_KEY
            });
    }
}
