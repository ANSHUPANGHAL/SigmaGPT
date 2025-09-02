import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY); // tu already .env me OPENAI_API_KEY use kar raha hai

export const getGeminiAPIResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚡ Error with Gemini API";
  }
};
