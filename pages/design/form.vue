<template>
  <div class="bg-blog-card animate-fade-in mx-auto max-w-3xl overflow-hidden rounded-xl p-4 shadow-2xl">
    <h2 class="mb-6 text-center text-3xl font-bold">Test de Formulaires</h2>
    <form class="space-y-6">
      <!-- Champ texte -->
      <div>
        <label for="nom" class="mb-1 block text-sm font-medium text-gray-300">Nom</label>
        <input type="text" id="nom" name="nom"
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none" />
      </div>
      <!-- Champ texte avec erreur de validation -->
      <div>
        <label for="nom_erreur" class="mb-1 block text-sm font-medium text-red-400">Nom (erreur)</label>
        <input type="text" id="nom_erreur" name="nom_erreur"
          class="w-full rounded-lg border border-red-500 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:outline-none" />
        <p class="mt-1 text-sm text-red-400">Ce champ est requis</p>
      </div>
      <!-- Champ texte avec validation réussie -->
      <div>
        <label for="nom_valide" class="mb-1 block text-sm font-medium text-green-400">Nom (valide)</label>
        <input type="text" id="nom_valide" name="nom_valide" value="John Doe"
          class="w-full rounded-lg border border-green-500 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:outline-none" />
        <p class="mt-1 text-sm text-green-400">Parfait !</p>
      </div>

      <!-- Champ email -->
      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-gray-300">Email</label>
        <input type="email" id="email" name="email"
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none" />
      </div>

      <!-- Champ mot de passe -->
      <div>
        <label for="password" class="mb-1 block text-sm font-medium text-gray-300">Mot de passe</label>
        <input type="password" id="password" name="password"
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none" />
      </div>

      <!-- Champ date -->
      <div>
        <label for="date" class="mb-1 block text-sm font-medium text-gray-300">Date de naissance</label>
        <input type="date" id="date" name="date"
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none" />
      </div>

      <!-- Champ nombre -->
      <div>
        <label for="nombre" class="mb-1 block text-sm font-medium text-gray-300">Âge</label>
        <input type="number" id="nombre" name="nombre" min="0" max="120"
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none" />
      </div>

      <!-- Select simple -->
      <div>
        <label for="pays" class="mb-1 block text-sm font-medium text-gray-300">Pays</label>
        <select id="pays" name="pays"
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none">
          <option value="">Sélectionnez un pays</option>
          <option value="dz">Algerie</option>
          <option value="fr">France</option>
          <option value="ca">Canada</option>
          <option value="be">Belgique</option>
          <option value="ch">Suisse</option>
        </select>
      </div>

      <!-- Select multiple -->
      <div>
        <label for="langues" class="mb-1 block text-sm font-medium text-gray-300">Langues parlées</label>
        <select id="langues" name="langues" multiple
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none">
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="es">Espagnol</option>
          <option value="de">Allemand</option>
          <option value="it">Italien</option>
        </select>
        <p class="mt-1 text-xs text-gray-400">
          Maintenez Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs options
        </p>
      </div>

      <!-- Checkbox simple -->
      <div class="flex items-center">
        <input type="checkbox" id="newsletter" name="newsletter"
          class="text-blog-accent focus:ring-blog-accent h-4 w-4 rounded border-gray-700" />
        <label for="newsletter" class="ml-2 block text-sm text-gray-300">
          S'abonner à la newsletter
        </label>
      </div>

      <!-- Checkbox multiple -->
      <div>
        <p class="mb-2 block text-sm font-medium text-gray-300">Centres d'intérêt</p>
        <div class="space-y-2">
          <div class="flex items-center">
            <input type="checkbox" id="interet_tech" name="interets[]" value="tech"
              class="text-blog-accent focus:ring-blog-accent h-4 w-4 rounded border-gray-700" />
            <label for="interet_tech" class="ml-2 block text-sm text-gray-300"> Technologie </label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="interet_design" name="interets[]" value="design"
              class="text-blog-accent focus:ring-blog-accent h-4 w-4 rounded border-gray-700" />
            <label for="interet_design" class="ml-2 block text-sm text-gray-300"> Design </label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="interet_business" name="interets[]" value="business"
              class="text-blog-accent focus:ring-blog-accent h-4 w-4 rounded border-gray-700" />
            <label for="interet_business" class="ml-2 block text-sm text-gray-300">
              Business
            </label>
          </div>
        </div>
      </div>

      <!-- Radio buttons -->
      <div>
        <p class="mb-2 block text-sm font-medium text-gray-300">Niveau d'expérience</p>
        <div class="space-y-2">
          <div class="flex items-center">
            <input type="radio" id="niveau_debutant" name="niveau" value="debutant"
              class="text-blog-accent focus:ring-blog-accent h-4 w-4 border-gray-700" />
            <label for="niveau_debutant" class="ml-2 block text-sm text-gray-300"> Débutant </label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="niveau_intermediaire" name="niveau" value="intermediaire"
              class="text-blog-accent focus:ring-blog-accent h-4 w-4 border-gray-700" />
            <label for="niveau_intermediaire" class="ml-2 block text-sm text-gray-300">
              Intermédiaire
            </label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="niveau_expert" name="niveau" value="expert"
              class="text-blog-accent focus:ring-blog-accent h-4 w-4 border-gray-700" />
            <label for="niveau_expert" class="ml-2 block text-sm text-gray-300"> Expert </label>
          </div>
        </div>
      </div>
      <!-- Textarea -->
      <div>
        <label for="commentaire" class="mb-1 block text-sm font-medium text-gray-300">Commentaire</label>
        <textarea id="commentaire" name="commentaire" rows="4"
          class="focus:ring-blog-accent w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:outline-none"></textarea>
      </div>
      <!-- Éditeur Markdown simplifié avec barre d'outils et aperçu modal -->
      <div>
        <label for="markdown" class="mb-1 block text-sm font-medium text-gray-300">Éditeur Markdown</label>²                                                                                                                    
        <UiFormMarkdownEditor />
      </div>
      <!-- Champ texte désactivé avec bg personnalisé -->
      <div>
        <label for="champ_disabled" class="mb-1 block text-sm font-medium text-gray-300">Champ désactivé</label>
        <input type="text" id="champ_disabled" name="champ_disabled" value="Ce champ est désactivé" disabled
          class="bg-blog-bg w-full cursor-not-allowed rounded-lg border border-gray-700 px-4 py-2 text-gray-400" />
      </div>

      <!-- Bouton de soumission -->
      <div>
        <button type="submit"
          class="bg-blog-accent w-full transform rounded-lg px-4 py-2 font-medium text-white transition-colors duration-200 hover:-translate-y-1 hover:bg-amber-500">
          Envoyer le formulaire
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>



definePageMeta({
  layout: 'blog', // correspond au fichier layouts/blog.vue
});
</script>
