// plugins/mastra.ts
import { Agent } from '@mastra/core/agent';
import { groq } from '@ai-sdk/groq';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Instructions pour l'agent
const instructions = `Tu es un assistant expert en chats. Tu dois répondre aux questions sur les chats en incluant un fait intéressant sur les chats.`;

// Création d'un outil pour récupérer un fait sur les chats
const getCatFact = async (): Promise<string> => {
  const res = await fetch('https://catfact.ninja/fact');
  const data = await res.json();
  return data.fact;
};

const catFactTool = createTool({
  id: 'catFact',
  inputSchema: z.object({}), // aucun paramètre requis
  description: 'Récupère un fait sur les chats',
  execute: async () => {
    console.log('Utilisation de l\'outil catFact');
    return { catFact: await getCatFact() };
  },
});

// Création de l'agent en utilisant un modèle OpenAI (ici "gpt-4o-mini")
export const catAgent = new Agent({
  name: 'cat-agent',
  instructions,
  model: groq('llama-3.3-70b-versatile'),
  tools: { catFact: catFactTool },
});
