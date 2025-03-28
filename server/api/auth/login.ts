// server/api/auth/login.ts
import { setCookie } from "h3"; // Utiliser la fonction pour gérer les cookies

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	// Vérifier les identifiants utilisateur
	if (body.username === "jsmith" && body.password === "hunter2") {
		const fakeToken = "fake-jwt-token"; // Générer ou utiliser un vrai JWT ici

		// Définir le token dans un cookie
		setCookie(event, "auth_token", fakeToken, {
			httpOnly: true, // Le cookie ne peut pas être lu par le client JS
			secure: process.env.NODE_ENV === "production", // Utiliser HTTPS en production
			path: "/", // Le cookie sera disponible sur tout le site
			maxAge: 60 * 60 * 24 * 7, // 7 jours
		});

		return {
			user: { id: 1, name: "John Smith" },
			token: fakeToken,
		};
	}

	throw createError({
		statusCode: 401,
		statusMessage: "Invalid credentials",
	});
});
