import type { Request, Response } from "express";
import { sendMessageToGemini } from "../services/chat.services"

export const handleChat = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { message, conversationId } = req.body;

    if (!message || !conversationId) {
      return res.status(400).json({
        error: "Both 'message' and 'conversationId' are required in the request body.",
      });
    }

    const reply = await sendMessageToGemini(conversationId, message);
    return res.status(200).json({ message: reply });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to process chat request.",
    });
  }
};

export const getHello = (_req: Request, res: Response): Response => {
  return res.status(200).json({ message: "Hello, World!" });
};