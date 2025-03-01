<template>
  <div class="max-w-3xl mx-auto p-4 bg-blog-card rounded-xl shadow-2xl overflow-hidden animate-fade-in">
    <h2 class="text-3xl font-bold mb-6 text-center">Test de Formulaires</h2>
    <form class="space-y-6">
      <!-- Champ texte -->
      <div>
        <label for="nom" class="block text-sm font-medium text-gray-300 mb-1">Nom</label>
        <input type="text" id="nom" name="nom"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent">
      </div>
      <!-- Champ texte avec erreur de validation -->
      <div>
        <label for="nom_erreur" class="block text-sm font-medium text-red-400 mb-1">Nom (erreur)</label>
        <input type="text" id="nom_erreur" name="nom_erreur"
          class="w-full bg-gray-800 text-white border border-red-500 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500">
        <p class="mt-1 text-sm text-red-400">Ce champ est requis</p>
      </div>
      <!-- Champ texte avec validation réussie -->
      <div>
        <label for="nom_valide" class="block text-sm font-medium text-green-400 mb-1">Nom (valide)</label>
        <input type="text" id="nom_valide" name="nom_valide" value="John Doe"
          class="w-full bg-gray-800 text-white border border-green-500 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500">
        <p class="mt-1 text-sm text-green-400">Parfait !</p>
      </div>

      <!-- Champ email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input type="email" id="email" name="email"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent">
      </div>

      <!-- Champ mot de passe -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
        <input type="password" id="password" name="password"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent">
      </div>

      <!-- Champ date -->
      <div>
        <label for="date" class="block text-sm font-medium text-gray-300 mb-1">Date de naissance</label>
        <input type="date" id="date" name="date"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent">
      </div>

      <!-- Champ nombre -->
      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-300 mb-1">Âge</label>
        <input type="number" id="nombre" name="nombre" min="0" max="120"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent">
      </div>

      <!-- Select simple -->
      <div>
        <label for="pays" class="block text-sm font-medium text-gray-300 mb-1">Pays</label>
        <select id="pays" name="pays"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent">
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
        <label for="langues" class="block text-sm font-medium text-gray-300 mb-1">Langues parlées</label>
        <select id="langues" name="langues" multiple
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent">
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="es">Espagnol</option>
          <option value="de">Allemand</option>
          <option value="it">Italien</option>
        </select>
        <p class="text-xs text-gray-400 mt-1">Maintenez Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs options</p>
      </div>

      <!-- Checkbox simple -->
      <div class="flex items-center">
        <input type="checkbox" id="newsletter" name="newsletter"
          class="h-4 w-4 text-blog-accent border-gray-700 rounded focus:ring-blog-accent">
        <label for="newsletter" class="ml-2 block text-sm text-gray-300">
          S'abonner à la newsletter
        </label>
      </div>

      <!-- Checkbox multiple -->
      <div>
        <p class="block text-sm font-medium text-gray-300 mb-2">Centres d'intérêt</p>
        <div class="space-y-2">
          <div class="flex items-center">
            <input type="checkbox" id="interet_tech" name="interets[]" value="tech"
              class="h-4 w-4 text-blog-accent border-gray-700 rounded focus:ring-blog-accent">
            <label for="interet_tech" class="ml-2 block text-sm text-gray-300">
              Technologie
            </label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="interet_design" name="interets[]" value="design"
              class="h-4 w-4 text-blog-accent border-gray-700 rounded focus:ring-blog-accent">
            <label for="interet_design" class="ml-2 block text-sm text-gray-300">
              Design
            </label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="interet_business" name="interets[]" value="business"
              class="h-4 w-4 text-blog-accent border-gray-700 rounded focus:ring-blog-accent">
            <label for="interet_business" class="ml-2 block text-sm text-gray-300">
              Business
            </label>
          </div>
        </div>
      </div>

      <!-- Radio buttons -->
      <div>
        <p class="block text-sm font-medium text-gray-300 mb-2">Niveau d'expérience</p>
        <div class="space-y-2">
          <div class="flex items-center">
            <input type="radio" id="niveau_debutant" name="niveau" value="debutant"
              class="h-4 w-4 text-blog-accent border-gray-700 focus:ring-blog-accent">
            <label for="niveau_debutant" class="ml-2 block text-sm text-gray-300">
              Débutant
            </label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="niveau_intermediaire" name="niveau" value="intermediaire"
              class="h-4 w-4 text-blog-accent border-gray-700 focus:ring-blog-accent">
            <label for="niveau_intermediaire" class="ml-2 block text-sm text-gray-300">
              Intermédiaire
            </label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="niveau_expert" name="niveau" value="expert"
              class="h-4 w-4 text-blog-accent border-gray-700 focus:ring-blog-accent">
            <label for="niveau_expert" class="ml-2 block text-sm text-gray-300">
              Expert
            </label>
          </div>
        </div>
      </div>
      <!-- Textarea -->
      <div>
        <label for="commentaire" class="block text-sm font-medium text-gray-300 mb-1">Commentaire</label>
        <textarea id="commentaire" name="commentaire" rows="4"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent"></textarea>
      </div>
      <!-- Éditeur Markdown simplifié avec barre d'outils et aperçu modal -->
      <div>
        <label for="markdown" class="block text-sm font-medium text-gray-300 mb-1">Éditeur Markdown</label>

        <!-- Barre d'outils de l'éditeur -->
        <div
          class="flex flex-wrap items-center bg-gray-900 border border-gray-700 border-b-0 rounded-t-lg px-3 py-2 gap-1">
          <button type="button" data-format="bold"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Gras">
            <i class="fas fa-bold"></i>
          </button>
          <button type="button" data-format="italic"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Italique">
            <i class="fas fa-italic"></i>
          </button>
          <button type="button" data-format="strikethrough"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Barré">
            <i class="fas fa-strikethrough"></i>
          </button>
          <div class="h-4 w-px bg-gray-700 mx-1"></div>
          <button type="button" data-format="h1"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Titre 1">
            <i class="fas fa-heading"></i><sup>1</sup>
          </button>
          <button type="button" data-format="h2"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Titre 2">
            <i class="fas fa-heading"></i><sup>2</sup>
          </button>
          <button type="button" data-format="h3"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Titre 3">
            <i class="fas fa-heading"></i><sup>3</sup>
          </button>
          <div class="h-4 w-px bg-gray-700 mx-1"></div>
          <button type="button" data-format="quote"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Citation">
            <i class="fas fa-quote-right"></i>
          </button>
          <button type="button" data-format="code"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Code">
            <i class="fas fa-code"></i>
          </button>
          <button type="button" data-format="codeblock"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Bloc de code">
            <i class="fas fa-file-code"></i>
          </button>
          <div class="h-4 w-px bg-gray-700 mx-1"></div>
          <button type="button" data-format="ul"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Liste à puces">
            <i class="fas fa-list-ul"></i>
          </button>
          <button type="button" data-format="ol"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Liste numérotée">
            <i class="fas fa-list-ol"></i>
          </button>
          <button type="button" data-format="task"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Liste de tâches">
            <i class="fas fa-tasks"></i>
          </button>
          <div class="h-4 w-px bg-gray-700 mx-1"></div>
          <button type="button" data-format="link"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Lien">
            <i class="fas fa-link"></i>
          </button>
          <button type="button" data-format="image"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Image">
            <i class="fas fa-image"></i>
          </button>
          <button type="button" data-format="table"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Tableau">
            <i class="fas fa-table"></i>
          </button>
          <div class="h-4 w-px bg-gray-700 mx-1"></div>
          <button type="button" data-format="hr"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-2 py-1 rounded" title="Ligne horizontale">
            <i class="fas fa-minus"></i>
          </button>
          <div class="flex-grow"></div>
          <button type="button" id="toggle-preview"
            class="text-white bg-blog-secondary hover:bg-blue-600 px-3 py-1 rounded transition-colors">
            <i class="fas fa-eye"></i> Aperçu
          </button>
        </div>

        <!-- Éditeur -->
        <textarea id="markdown" name="markdown" rows="8"
          class="w-full bg-gray-800 text-white border border-gray-700 border-t-0 rounded-b-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent font-mono"
          placeholder="Écrivez votre contenu en Markdown ici...">## Bienvenue dans l'éditeur Markdown

Ceci est un **texte en gras** et ceci est en *italique*.

### Caractéristiques:
- Support pour les listes
- Titres de différents niveaux
- Et bien plus encore!

```js
// Un peu de code JavaScript
function saluer(nom) {
  return `Bonjour, ${nom}!`;
}
```</textarea>

        <!-- Modal Aperçu (caché par défaut) -->
        <div id="preview-modal"
          class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden">
          <div class="bg-blog-card rounded-xl max-w-3xl w-full mx-4 max-h-[80vh] flex flex-col">
            <div class="flex justify-between items-center border-b border-gray-700 p-4">
              <h3 class="text-xl font-bold">Aperçu Markdown</h3>
              <button id="close-preview" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            <div id="markdown-preview" class="overflow-auto p-4 prose prose-invert max-w-none flex-grow">
              <!-- Le contenu de l'aperçu sera injecté ici -->
            </div>
            <div class="border-t border-gray-700 p-4 flex justify-end">
              <button id="close-preview-btn"
                class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
                Fermer
              </button>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-400 mt-1">Utilisez la syntaxe Markdown ou les boutons de formatage pour styliser
          votre texte</p>
      </div>

      <!-- Champ texte désactivé avec bg personnalisé -->
      <div>
        <label for="champ_disabled" class="block text-sm font-medium text-gray-300 mb-1">Champ désactivé</label>
        <input type="text" id="champ_disabled" name="champ_disabled" value="Ce champ est désactivé" disabled
          class="w-full bg-blog-bg text-gray-400 border border-gray-700 rounded-lg py-2 px-4 cursor-not-allowed">
      </div>

      <!-- Bouton de soumission -->
      <div>
        <button type="submit"
          class="w-full bg-blog-accent text-white font-medium py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors transform hover:-translate-y-1 duration-200">
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

<style></style>
