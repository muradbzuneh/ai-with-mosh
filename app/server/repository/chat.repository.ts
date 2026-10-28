import type { ChatMessage } from "../types/chat.types";

// In-memory conversation store
const conversationStore = new Map<string, ChatMessage[]>();

export const getConversationHistory = (conversationId: string): ChatMessage[] => {
  return conversationStore.get(conversationId) || [];
};

export const saveConversationHistory = (
  conversationId: string,
  history: ChatMessage[]
): void => {
  conversationStore.set(conversationId, history);
};

export const clearConversationHistory = (conversationId: string): void => {
  conversationStore.delete(conversationId);
};