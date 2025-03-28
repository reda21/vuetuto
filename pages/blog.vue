<template>
  <section class="animate-fade-in px-4 py-16 md:py-24">
    <div class="flex flex-col items-center md:flex-row">
      <div class="mb-8 md:mb-0 md:w-1/2 md:pr-8">
        <h2 class="mb-6 text-4xl leading-tight font-bold md:text-5xl">
          Découvrez les <span class="text-blog-accent">dernières tendances</span> du monde numérique
        </h2>
        <p class="mb-8 text-xl text-gray-300">
          Des articles de qualité sur la technologie, le design et le développement web pour rester
          à la pointe de l'innovation.
        </p>
        <div class="flex flex-wrap gap-4">
          <a
            href="#"
            class="bg-blog-accent transform rounded-lg px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-amber-500"
          >
            Découvrir les articles
          </a>
          <a
            href="#"
            class="border-blog-secondary text-blog-secondary hover:bg-blog-secondary transform rounded-lg border px-6 py-3 font-medium transition-all duration-300 hover:-translate-y-1 hover:text-white"
          >
            En savoir plus
          </a>
        </div>
      </div>
      <div class="md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Espace de travail moderne"
          class="h-auto w-full transform rounded-xl object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </div>
  </section>
  <div class="flex flex-col gap-8 lg:flex-row">
    <!-- Liste des articles (2/3 de l'écran) -->
    <div class="lg:w-2/3">
      <h2 class="mb-8 border-b border-gray-700 pb-4 text-3xl font-bold">Articles récents</h2>
      <!-- Grille d'articles -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <!-- Article 1 -->
        <article
          class="bg-blog-card animate-slide-in overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
          style="animation-delay: 0.1s"
        >
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
            alt="Développement web"
            class="h-48 w-full object-cover"
          />
          <div class="p-6">
            <span
              class="bg-blog-secondary mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
            >
              Développement
            </span>
            <h3 class="hover:text-blog-accent mb-3 text-xl font-bold transition-colors">
              <a href="#">Les tendances du développement web en 2025</a>
            </h3>
            <p class="mb-4 text-gray-300">
              Découvrez les technologies et frameworks qui domineront le paysage du développement
              web cette année.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">12 mars 2025</span>
              <a href="#" class="text-blog-accent flex items-center font-medium hover:underline">
                Lire plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Article 2 -->
        <article
          class="bg-blog-card animate-slide-in overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
          style="animation-delay: 0.2s"
        >
          <img
            src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Design UI/UX"
            class="h-48 w-full object-cover"
          />
          <div class="p-6">
            <span
              class="bg-blog-tertiary mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
            >
              Design
            </span>
            <h3 class="hover:text-blog-accent mb-3 text-xl font-bold transition-colors">
              <a href="#">Principes de design UI/UX pour une expérience optimale</a>
            </h3>
            <p class="mb-4 text-gray-300">
              Les meilleures pratiques pour créer des interfaces utilisateur intuitives et
              esthétiques.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">5 mars 2025</span>
              <a href="#" class="text-blog-accent flex items-center font-medium hover:underline">
                Lire plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Article 3 -->
        <article
          class="bg-blog-card animate-slide-in overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
          style="animation-delay: 0.3s"
        >
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1034&q=80"
            alt="Intelligence artificielle"
            class="h-48 w-full object-cover"
          />
          <div class="p-6">
            <span
              class="mb-4 inline-block rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white"
            >
              IA
            </span>
            <h3 class="hover:text-blog-accent mb-3 text-xl font-bold transition-colors">
              <a href="#">L'IA dans le développement : révolution ou évolution ?</a>
            </h3>
            <p class="mb-4 text-gray-300">
              Comment l'intelligence artificielle transforme les méthodes de développement et de
              conception.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">28 février 2025</span>
              <a href="#" class="text-blog-accent flex items-center font-medium hover:underline">
                Lire plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Article 4 -->
        <article
          class="bg-blog-card animate-slide-in overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
          style="animation-delay: 0.4s"
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Cybersécurité"
            class="h-48 w-full object-cover"
          />
          <div class="p-6">
            <span
              class="mb-4 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
            >
              Sécurité
            </span>
            <h3 class="hover:text-blog-accent mb-3 text-xl font-bold transition-colors">
              <a href="#">Sécuriser vos applications web : guide complet</a>
            </h3>
            <p class="mb-4 text-gray-300">
              Les meilleures pratiques pour protéger vos applications contre les menaces actuelles.
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">15 février 2025</span>
              <a href="#" class="text-blog-accent flex items-center font-medium hover:underline">
                Lire plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex justify-center">
        <nav class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            href="#"
            class="bg-blog-card hover:bg-blog-accent relative inline-flex items-center rounded-l-md border border-gray-700 px-2 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            <span class="sr-only">Précédent</span>
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            class="bg-blog-accent relative inline-flex items-center border border-gray-700 px-4 py-2 text-sm font-medium text-white"
          >
            1
          </a>
          <a
            href="#"
            class="bg-blog-card relative inline-flex items-center border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
          >
            2
          </a>
          <a
            href="#"
            class="bg-blog-card relative inline-flex items-center border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
          >
            3
          </a>
          <span
            class="bg-blog-card relative inline-flex items-center border border-gray-700 px-4 py-2 text-sm font-medium text-gray-400"
          >
            ...
          </span>
          <a
            href="#"
            class="bg-blog-card relative inline-flex items-center border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
          >
            8
          </a>
          <a
            href="#"
            class="bg-blog-card hover:bg-blog-accent relative inline-flex items-center rounded-r-md border border-gray-700 px-2 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            <span class="sr-only">Suivant</span>
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>

    <!-- Sidebar (1/3 de l'écran) -->
    <aside class="space-y-8 lg:w-1/3">
      <!-- Champ de recherche -->
      <div class="bg-blog-card rounded-xl p-6 shadow-lg">
        <h3 class="mb-4 text-xl font-bold">Rechercher</h3>
        <div class="relative">
          <input
            type="text"
            placeholder="Rechercher un article..."
            class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white focus:ring-2 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute top-3 left-3 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Catégories -->
      <div class="bg-blog-card rounded-xl p-6 shadow-lg">
        <h3 class="mb-4 text-xl font-bold">Catégories</h3>
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="hover:text-blog-accent flex items-center justify-between text-gray-300 transition-colors"
            >
              <span>Développement Web</span>
              <span class="bg-blog-bg rounded-full px-2 py-1 text-xs">24</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-blog-accent flex items-center justify-between text-gray-300 transition-colors"
            >
              <span>Design UI/UX</span>
              <span class="bg-blog-bg rounded-full px-2 py-1 text-xs">18</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-blog-accent flex items-center justify-between text-gray-300 transition-colors"
            >
              <span>Intelligence Artificielle</span>
              <span class="bg-blog-bg rounded-full px-2 py-1 text-xs">12</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-blog-accent flex items-center justify-between text-gray-300 transition-colors"
            >
              <span>Cybersécurité</span>
              <span class="bg-blog-bg rounded-full px-2 py-1 text-xs">9</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-blog-accent flex items-center justify-between text-gray-300 transition-colors"
            >
              <span>DevOps</span>
              <span class="bg-blog-bg rounded-full px-2 py-1 text-xs">7</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Articles populaires -->
      <div class="bg-blog-card rounded-xl p-6 shadow-lg">
        <h3 class="mb-4 text-xl font-bold">Articles populaires</h3>
        <ul class="space-y-4">
          <li class="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
              alt="Article populaire"
              class="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <h4 class="hover:text-blog-accent font-medium transition-colors">
                <a href="#">Les tendances du développement web en 2025</a>
              </h4>
              <p class="text-sm text-gray-400">12 mars 2025</p>
            </div>
          </li>
          <li class="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
              alt="Article populaire"
              class="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <h4 class="hover:text-blog-accent font-medium transition-colors">
                <a href="#">Principes de design UI/UX pour une expérience optimale</a>
              </h4>
              <p class="text-sm text-gray-400">5 mars 2025</p>
            </div>
          </li>
          <li class="flex gap-3">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
              alt="Article populaire"
              class="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <h4 class="hover:text-blog-accent font-medium transition-colors">
                <a href="#">L'IA dans le développement : révolution ou évolution ?</a>
              </h4>
              <p class="text-sm text-gray-400">28 février 2025</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Tags -->
      <div class="bg-blog-card rounded-xl p-6 shadow-lg">
        <h3 class="mb-4 text-xl font-bold">Tags populaires</h3>
        <div class="flex flex-wrap gap-2">
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #javascript
          </a>
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #react
          </a>
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #tailwindcss
          </a>
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #webdesign
          </a>
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #ux
          </a>
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #ai
          </a>
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #cybersecurity
          </a>
          <a
            href="#"
            class="bg-blog-bg hover:bg-blog-accent rounded-full px-3 py-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            #frontend
          </a>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="from-blog-accent to-blog-secondary rounded-xl bg-gradient-to-br p-6 shadow-lg">
        <h3 class="mb-2 text-xl font-bold text-white">Abonnez-vous à notre newsletter</h3>
        <p class="mb-4 text-white/90">
          Recevez nos derniers articles et actualités directement dans votre boîte mail.
        </p>
        <form class="space-y-3">
          <input
            type="email"
            placeholder="Votre adresse email"
            class="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-2 text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:outline-none"
          />
          <button
            type="submit"
            class="text-blog-secondary w-full rounded-lg bg-white px-4 py-2 font-medium transition-colors hover:bg-gray-100"
          >
            S'abonner
          </button>
        </form>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: "blog", // correspond au fichier layouts/blog.vue
});
</script>

<style></style>
