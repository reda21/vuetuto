<template>
  <div class="bg-blog-card animate-fade-in mx-auto max-w-md overflow-hidden rounded-xl shadow-2xl">
    <div class="p-8">
      <div class="mb-8 text-center">
        <h2 class="mb-2 text-2xl font-bold">Connexion</h2>
        <p class="text-gray-400">Connectez-vous pour accéder à votre compte</p>
      </div>

      <!-- Boutons de connexion avec réseaux sociaux -->
      <div class="mb-6 flex flex-col space-y-3">
        <button
          class="flex items-center justify-center rounded-lg bg-[#4267B2] px-4 py-2 text-white transition-colors hover:bg-[#365899]"
        >
          <i class="fab fa-facebook-f mr-3"></i>
          <span>Continuer avec Facebook</span>
        </button>
        <button
          class="flex items-center justify-center rounded-lg bg-[#1DA1F2] px-4 py-2 text-white transition-colors hover:bg-[#1a91da]"
        >
          <i class="fab fa-twitter mr-3"></i>
          <span>Continuer avec Twitter</span>
        </button>
        <button
          class="flex items-center justify-center rounded-lg bg-[#DB4437] px-4 py-2 text-white transition-colors hover:bg-[#c53929]"
        >
          <i class="fab fa-google mr-3"></i>
          <span>Continuer avec Google</span>
        </button>
      </div>

      <!-- Séparateur -->
      <div class="my-6 flex items-center">
        <div class="flex-grow border-t border-gray-600"></div>
        <span class="px-4 text-sm text-gray-400">OU</span>
        <div class="flex-grow border-t border-gray-600"></div>
      </div>

      <!-- Formulaire de connexion classique -->
      <form class="space-y-4">
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
          <div class="mb-1 flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-300"
              >Mot de passe</label
            >
            <a href="#" class="text-blog-accent text-xs hover:underline">Mot de passe oublié ?</a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            required
            class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            class="text-blog-accent focus:ring-blog-accent h-4 w-4 rounded border-gray-700"
          />
          <label for="remember" class="ml-2 block text-sm text-gray-300">
            Se souvenir de moi
          </label>
        </div>

        <button
          type="submit"
          class="bg-blog-accent w-full transform rounded-lg px-4 py-2 font-medium text-white transition-colors duration-200 hover:-translate-y-1 hover:bg-amber-500"
        >
          Se connecter
        </button>
      </form>

      <p class="mt-6 text-center text-gray-400">
        Vous n'avez pas de compte ?
        <a href="inscription.html" class="text-blog-accent hover:underline">Inscrivez-vous</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'blog', // correspond au fichier layouts/blog.vue
});
</script>

<style></style>
