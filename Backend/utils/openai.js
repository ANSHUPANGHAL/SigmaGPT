import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini client initialize karo
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

const getOpenAIAPIResponse = async (message) => {
  try {
    // Gemini model choose karo (flash fast hai, pro jyada accurate)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // message bhejna
    const result = await model.generateContent(message);

    // response nikalna
    return result.response.text();
  } catch (err) {
    console.error("Gemini API error response:", err);
    return "Error: No response from Gemini";
  }
};

export default getOpenAIAPIResponse;
