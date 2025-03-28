// server/api/auth/logout.ts
import { setCookie } from "h3";

export default defineEventHandler((event) => {
	// Supprimer le cookie contenant le token
	setCookie(event, "auth_token", "", {
		httpOnly: true, // Le cookie ne peut pas être accédé via JavaScript
		secure: process.env.NODE_ENV === "production", // Si en production, nécessite HTTPS
		path: "/", // Le cookie sera disponible sur tout le site
		maxAge: -1, // Le cookie expire immédiatement
	});

	// Retourner un message de succès
	return { message: "Déconnexion réussie" };
});
