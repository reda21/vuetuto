# 📜 Règles du projet - Nuxt.js + TypeScript + TailwindCSS

## 1. Généralités
- Utiliser **TypeScript** sur tout le projet.
- Respecter la structure standard d'un projet **Nuxt 3**.
- Utiliser le système de **routes automatiques** (`pages/`).

---

## 2. Conventions de code
- **camelCase** pour les variables et fonctions.
- **PascalCase** pour les noms de composants Vue.
- Fichiers en **kebab-case** (ex : `user-profile.vue`).
- Indentation de **2 espaces**.
- Ajouter des **commentaires** sur les fonctions complexes.

---

## 3. TailwindCSS
- Utiliser **exclusivement TailwindCSS** pour le style.
- Composer les classes avec `@apply` en cas de répétition.
- Ne jamais surcharger directement les classes Tailwind sans raison.

---

## 4. Structure du projet
```
components/
pages/
layouts/
composables/
plugins/
assets/
public/
utils/
types/
store/
```
- **store/** est réservé pour Pinia.
- **types/** pour les interfaces et types TypeScript.

---

## 5. Typage TypeScript
- Toujours **tiper** les props, les événements et les retours de fonctions.
- Éviter l'usage de `any`, sauf exception clairement commentée.

---

## 6. Utilisation de @pinia/nuxt (Store)
- Créer un store dans le dossier `store/`, exemple : `store/user.ts`.
- Utiliser la syntaxe **defineStore** avec **TypeScript** :
  ```ts
  export const useUserStore = defineStore('user', {
    state: () => ({
      name: '' as string,
      age: 0 as number,
    }),
    getters: { ... },
    actions: { ... }
  })
  ```
- Chaque store doit être **fortement typé**.
- Préférer **des actions propres** pour modifier l'état (ne pas modifier directement le state depuis les composants).

---

## 7. Utilisation de @vueuse/nuxt
- Utiliser les **composables** fournis par VueUse au lieu de recréer des outils standards (ex : `useMouse`, `useFetch`, `useDark`).
- Vérifier toujours si une solution existe dans VueUse avant d'implémenter manuellement.
- Charger les composables via l’injection automatique de Nuxt (`autoImports` activé).

---

## 8. Bonnes pratiques Nuxt.js
- Utiliser **`useFetch`**, **`useAsyncData`** pour les appels réseau.
- Utiliser **`<script setup>`** dans tous les composants Vue.
- Préférer les **composables (`composables/`)** pour partager la logique métier.
- Utiliser **definePageMeta** pour les règles par page (auth, SEO...).

---

## 9. Tests avec Vitest et @nuxt/test-utils/module
- Tous les fichiers de test doivent être dans un dossier `__tests__` ou suffixés par `.spec.ts`.
- Exemple :
  ```
  components/
    Button.vue
    __tests__/
      Button.spec.ts
  ```
- Utiliser **Vitest** pour :
  - Tester les composants Vue (`mount()` de @nuxt/test-utils).
  - Tester les stores Pinia.
  - Tester les composables.
- Utiliser **mocks** si nécessaire pour éviter de toucher aux API externes.

Exemple de test basique :
```ts
import { mount } from '@nuxt/test-utils'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button)
    expect(wrapper.text()).toContain('Envoyer')
  })
})
```

- Lancer les tests avec :
  ```bash
  pnpm test
  ```
  ou
  ```bash
  npm run test
  ```

---

## 10. Performance et SEO
- Utiliser **nuxt-img** pour les images optimisées.
- Ajouter les balises meta dans les pages principales via `useHead`.
- Utiliser le lazy-loading (`loading="lazy"`) sur les images.

---

## 11. Déploiement
- Le projet est prévu pour être **universel** (SSR).
- Optimiser le serveur avec **Nitro**.

---

# 📦 Checklist rapide
- [ ] Code propre, typé et structuré
- [ ] Stores Pinia utilisés correctement
- [ ] Utilitaires VueUse priorisés
- [ ] Tests unitaires présents
- [ ] SEO et performance respectés
- [ ] TailwindCSS utilisé proprement