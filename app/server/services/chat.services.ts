import { GoogleGenAI } from "@google/genai";
import {
  getConversationHistory,
  saveConversationHistory,
} from "../repository/chat.repository";
import { ChatMessage } from "../types/chat.types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Sleep helper for retry delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMessageToGemini = async (
  conversationId: string,
  userMessage: string
): Promise<string> => {
  const history = getConversationHistory(conversationId);

  const updatedHistory: ChatMessage[] = [
    ...history,
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  // Primary model and fallback model
  const candidateModels = ["gemini-flash-latest"];

  for (const model of candidateModels) {
    // Retry up to 3 times per model with backoff
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: updatedHistory,
          config: {
            temperature: 0.7,
            maxOutputTokens: 150,
          },
        });

        const reply = response.text || "";

        updatedHistory.push({
          role: "model",
          parts: [{ text: reply }],
        });

        saveConversationHistory(conversationId, updatedHistory);
        return reply;
      } catch (err: any) {
        const is503 = err?.status === 503 || err?.message?.includes("503") || err?.message?.includes("high demand");

        if (is503 && attempt < 3) {
          console.warn(`[503 High Demand] Retrying ${model} (attempt ${attempt}/3)...`);
          await delay(attempt * 1500); // Wait 1.5s, then 3s
          continue;
        }

        // If all retries failed for this model, fall through to candidateModels
        if (is503) {
          console.warn(`Model ${model} unavailable. Falling back to alternative...`);
          break;
        }

        // Rethrow client or authentication errors immediately
        throw err;
      }
    }
  }

  throw new Error("All Gemini models are temporarily congested. Please retry in a few moments.");
};