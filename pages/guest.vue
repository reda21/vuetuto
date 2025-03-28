<template>
  <div>
    <h1>Guest</h1>
    <p>You are currently {{ status }}.</p>
    <!-- Affiche le bouton en fonction de l'état de la connexion -->
    <button
      v-if="status === 'authenticated'"
      @click="logout"
      class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
    >
      Logout
    </button>
    <button
      v-else
      @click="login"
      class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Login
    </button>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
// Récupération des fonctions depuis `useAuth`
const { status, signIn, signOut, data } = useAuth();
const router = useRouter();

// Credentials pour la connexion (à adapter selon vos besoins)
const credentials = { username: "jsmith", password: "hunter2" };

// Fonction pour gérer la connexion
const login = async () => {
	try {
		// Appeler l'endpoint de connexion
		await signIn(credentials);
		console.log("Connexion réussie");

		// Redirection vers une autre page (facultatif)
		//    router.push('/user'); // Assurez-vous que `/user` correspond au chemin de votre page
	} catch (error) {
		console.error("Erreur lors de la connexion :", error);
	}
};

// Fonction pour gérer la déconnexion
const logout = async () => {
	try {
		// Appeler l'endpoint de déconnexion
		await signOut();
		console.log("Déconnexion réussie");

		// Retour à la page d'accueil ou une autre page
		router.push("/"); // Modifier le chemin si nécessaire
	} catch (error) {
		console.error("Erreur lors de la déconnexion :", error);
	}
};
</script>

<style></style>
