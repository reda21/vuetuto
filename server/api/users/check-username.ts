// server/api/users/check-username.ts
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  // Récupère le paramètre "username" dans la query string
  const { username } = getQuery(event) as { username?: string };

  // Logique de test simple : on considère que "taken" est déjà pris
  const isTaken = username === 'reda22';

  // Ajout d'un délai de 2 secondes
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // Retourne un JSON indiquant si le pseudo est disponible
  return {
    available: !isTaken,
  };
});
