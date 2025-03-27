// server/api/cat.ts
import { catAgent } from '@/ai/mastra';

export default defineEventHandler(async (event) => {
  // L'agent génère une réponse en utilisant ses instructions et l'outil catFact
  const result = await catAgent.generate('Donne-moi un fait sur les chats');
  return result;
});
