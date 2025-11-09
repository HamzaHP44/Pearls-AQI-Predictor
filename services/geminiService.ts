import { GoogleGenAI } from "@google/genai";
import { AqiLevel } from '../types';

export const getHealthRecommendations = async (aqi: number, level: AqiLevel): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Please set up your API key.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `The current Air Quality Index (AQI) is ${aqi}, which is considered "${level}". Provide a concise, user-friendly explanation of what this means and three practical health recommendations for the general public. Format the response as a single paragraph of explanation followed by a bulleted list of recommendations using markdown. For example:
Explanation text here.
- Recommendation 1
- Recommendation 2
- Recommendation 3`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching health recommendations from the AI service:", error);
    return "Could not fetch health recommendations at this time. Please try again later.";
  }
};