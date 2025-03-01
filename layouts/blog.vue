<template>
  <div>
    <!-- En-tête (Header) -->
    <header
      class="bg-light-bg/95 dark:bg-blog-bg/95 text-gray-700 dark:text-gray-100 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <div class="container mx-auto flex flex-col items-center justify-between px-4 py-4 md:flex-row">
        <!-- Logo et titre du blog -->
        <div class="mb-4 flex items-center md:mb-0">
          <h1 class="text-2xl font-bold text-white">
            <span class="text-blog-accent">Le</span class="text-gray-700 dark:text-gray-100">Blog<span class="text-blog-secondary">Moderne</span>
          </h1>
        </div>

        <!-- Navigation -->
        <nav class="w-full md:w-auto">
          <ul class="flex flex-wrap justify-center space-x-1 md:justify-end md:space-x-6">
            <li>
              <a href="#"
                class="hover:bg-blog-card hover:text-blog-accent rounded-md px-3 py-2 text-white transition-colors duration-300">Accueil</a>
            </li>
            <li>
              <a href="#"
                class="hover:bg-blog-card hover:text-blog-accent rounded-md px-3 py-2 text-white transition-colors duration-300">Articles</a>
            </li>
            <li>
              <a href="#"
                class="hover:bg-blog-card hover:text-blog-accent rounded-md px-3 py-2 text-white transition-colors duration-300">À
                propos</a>
            </li>
            <li>
              <a href="#"
                class="hover:bg-blog-card hover:text-blog-accent rounded-md px-3 py-2 text-white transition-colors duration-300">Contact</a>
            </li>
            <li>
              <a href="#"
                class="bg-blog-accent ml-2 rounded-md px-4 py-2 text-white transition-colors duration-300 hover:bg-amber-500">S'abonner</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <!-- Contenu principal -->
    <main class="container mx-auto px-4 py-12">
      <slot />
    </main>
    <!-- Pied de page (Footer) -->
    <footer class="bg-blog-card mt-16 border-t border-gray-700">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <!-- À propos -->
          <div>
            <h4 class="mb-4 text-xl font-bold">À propos</h4>
            <p class="mb-4 text-gray-300">
              Le Blog Moderne est votre source d'information sur les dernières tendances en
              développement web, design UI/UX et technologies numériques. Notre mission est de vous
              tenir informé et inspiré.
            </p>
            <div class="mt-4 flex space-x-4">
              <a href="#" class="hover:text-blog-accent text-gray-400 transition-colors">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="hover:text-blog-accent text-gray-400 transition-colors">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="hover:text-blog-accent text-gray-400 transition-colors">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="hover:text-blog-accent text-gray-400 transition-colors">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <!-- Liens rapides -->
          <div>
            <h4 class="mb-4 text-xl font-bold">Liens rapides</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Articles</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">À propos</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Politique de
                  confidentialité</a>
              </li>
            </ul>
          </div>

          <!-- Catégories -->
          <div>
            <h4 class="mb-4 text-xl font-bold">Catégories</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Développement Web</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Design UI/UX</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Intelligence Artificielle</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">Cybersécurité</a>
              </li>
              <li>
                <a href="#" class="hover:text-blog-accent text-gray-300 transition-colors">DevOps</a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="mb-4 text-xl font-bold">Contact</h4>
            <ul class="space-y-2">
              <li class="flex items-start space-x-3">
                <i class="fas fa-map-marker-alt text-blog-accent mt-1"></i>
                <span class="text-gray-300">123 Rue du Web, 75000 Paris, France</span>
              </li>
              <li class="flex items-start space-x-3">
                <i class="fas fa-envelope text-blog-accent mt-1"></i>
                <span class="text-gray-300">contact@leblogmoderne.fr</span>
              </li>
              <li class="flex items-start space-x-3">
                <i class="fas fa-phone text-blog-accent mt-1"></i>
                <span class="text-gray-300">+33 1 23 45 67 89</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-12 flex flex-col items-center justify-between border-t border-gray-700 pt-8 md:flex-row">
          <p class="mb-4 text-sm text-gray-400 md:mb-0">
            &copy; 2025 Le Blog Moderne. Tous droits réservés.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="hover:text-blog-accent text-sm text-gray-400 transition-colors">Conditions
              d'utilisation</a>
            <a href="#" class="hover:text-blog-accent text-sm text-gray-400 transition-colors">Politique de
              confidentialité</a>
            <a href="#" class="hover:text-blog-accent text-sm text-gray-400 transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Bouton retour en haut -->
    <button ref="backToTopButton" @click="scrollToTop"
      class="bg-blog-accent focus:ring-blog-accent invisible fixed right-6 bottom-6 rounded-full p-3 text-white opacity-0 shadow-lg transition-all duration-300 hover:bg-amber-500 focus:ring-2 focus:ring-offset-2 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const backToTopButton = ref<HTMLButtonElement | null>(null);

// Gestion du bouton "Retour en haut"
const handleScroll = () => {
  if (!backToTopButton.value) return;

  if (window.pageYOffset > 300) {
    backToTopButton.value.classList.remove('opacity-0', 'invisible');
    backToTopButton.value.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.value.classList.remove('opacity-100', 'visible');
    backToTopButton.value.classList.add('opacity-0', 'invisible');
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style></style>
