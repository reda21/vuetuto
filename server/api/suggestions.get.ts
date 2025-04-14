export default defineEventHandler(async (event) => {
  const query = getQuery(event).q;
  
  // Simuler un délai de réponse
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Exemple de données - remplacer par une vraie source de données
  return Array.from({ length: 10 }, (_, i) => `${query}-résultat-${i + 1}`);
});