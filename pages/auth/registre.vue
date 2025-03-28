<template>
  <div class="bg-blog-card animate-fade-in mx-auto max-w-2xl overflow-hidden rounded-xl shadow-2xl">
    <div class="md:flex">
      <!-- Image décorative (visible uniquement sur desktop) -->
      <div
        class="from-blog-accent to-blog-secondary hidden bg-gradient-to-br p-12 md:flex md:w-1/2 md:flex-col md:justify-center"
      >
        <h2 class="mb-4 text-3xl font-bold text-white">Rejoignez notre communauté</h2>
        <p class="mb-6 text-white/90">
          Accédez à du contenu exclusif et participez aux discussions avec d'autres passionnés.
        </p>
        <div class="flex items-center space-x-4 text-white">
          <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>Articles exclusifs</span>
          </div>
        </div>
        <div class="mt-2 flex items-center space-x-4 text-white">
          <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>Commentaires</span>
          </div>
        </div>
        <div class="mt-2 flex items-center space-x-4 text-white">
          <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>Newsletter personnalisée</span>
          </div>
        </div>
      </div>

      <!-- Formulaire d'inscription -->
      <div class="p-8 md:w-1/2">
        <div class="mb-8 text-center">
          <h2 class="mb-2 text-2xl font-bold">Créer un compte</h2>
          <p class="text-gray-400">Inscrivez-vous pour accéder à toutes les fonctionnalités</p>
        </div>

        <!-- Boutons de connexion avec réseaux sociaux -->
        <div class="mb-6 flex flex-col space-y-3">
          <button
            class="flex items-center justify-center rounded-lg bg-[#4267B2] px-4 py-2 text-white transition-colors hover:bg-[#365899]"
          >
            <i class="fab fa-facebook-f mr-3"></i>
            <span>S'inscrire avec Facebook</span>
          </button>
          <button
            class="flex items-center justify-center rounded-lg bg-[#1DA1F2] px-4 py-2 text-white transition-colors hover:bg-[#1a91da]"
          >
            <i class="fab fa-twitter mr-3"></i>
            <span>S'inscrire avec Twitter</span>
          </button>
          <button
            class="flex items-center justify-center rounded-lg bg-[#DB4437] px-4 py-2 text-white transition-colors hover:bg-[#c53929]"
          >
            <i class="fab fa-google mr-3"></i>
            <span>S'inscrire avec Google</span>
          </button>
        </div>

        <!-- Séparateur -->
        <div class="my-6 flex items-center">
          <div class="flex-grow border-t border-gray-600"></div>
          <span class="px-4 text-sm text-gray-400">OU</span>
          <div class="flex-grow border-t border-gray-600"></div>
        </div>

        <!-- Formulaire d'inscription classique -->
        <form class="space-y-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label for="prenom" class="mb-1 block text-sm font-medium text-gray-300"
                >Prénom</label
              >
              <input
                type="text"
                id="prenom"
                name="prenom"
                required
                class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"
              />
            </div>
            <div>
              <label for="nom" class="mb-1 block text-sm font-medium text-gray-300">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label for="email" class="mb-1 block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label for="password" class="mb-1 block text-sm font-medium text-gray-300"
              >Mot de passe</label
            >
            <input
              type="password"
              id="password"
              name="password"
              required
              class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"
            />
            <p class="mt-1 text-xs text-gray-400">
              Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre
            </p>
          </div>

          <div>
            <label for="password_confirm" class="mb-1 block text-sm font-medium text-gray-300"
              >Confirmer le mot de passe</label
            >
            <input
              type="password"
              id="password_confirm"
              name="password_confirm"
              required
              class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"
            />
          </div>

          <div class="flex items-start">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              class="text-blog-accent focus:ring-blog-accent mt-1 h-4 w-4 rounded border-gray-700"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-300">
              J'accepte les
              <a href="#" class="text-blog-accent hover:underline">conditions d'utilisation</a> et
              la
              <a href="#" class="text-blog-accent hover:underline">politique de confidentialité</a>
            </label>
          </div>

          <button
            type="submit"
            class="bg-blog-accent w-full transform rounded-lg px-4 py-2 font-medium text-white transition-colors duration-200 hover:-translate-y-1 hover:bg-amber-500"
          >
            Créer mon compte
          </button>
        </form>

        <p class="mt-6 text-center text-gray-400">
          Vous avez déjà un compte ?
          <a href="connexion.html" class="text-blog-accent hover:underline">Connectez-vous</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: "blog", // correspond au fichier layouts/blog.vue
});
</script>

<style></style>
