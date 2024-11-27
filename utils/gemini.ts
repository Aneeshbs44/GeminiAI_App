import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'YOUR_API_KEY';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate response');
  }
};
