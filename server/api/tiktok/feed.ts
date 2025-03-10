export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const username = query.username as string;

  // Logique d'appel à l'API TikTok avec le secret ici
  // ...
}); 