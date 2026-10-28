import { GoogleGenAI } from "@google/genai";
import {
  getConversationHistory,
  saveConversationHistory,
} from "../repository/chat.repository";
import type { ChatMessage } from "../types/chat.types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// src/services/chat.service.ts

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

  // Change model here from "gemini-2.5-flash" to "gemini-3.8-flash"
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
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
};