Voici la conversion du projet en Nuxt.js avec une structure optimisée :

```
nuxt-project/
├─ nuxt.config.ts
├─ app.vue
├─ components/
│  ├─ GameMap.client.vue
│  ├─ VirusCreator.vue
│  ├─ StatsPanel.vue
│  ├─ NewsTicker.vue
├─ composables/
│  ├─ useSimulation.ts
│  ├─ useVirus.ts
│  ├─ useEventSystem.ts
├─ pages/
│  ├─ index.vue
├─ assets/
│  ├─ styles/
│  │  ├─ global.scss
├─ public/
│  ├─ world-data.json
```

1. **nuxt.config.ts** :
```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/styles/global.scss'],
  build: {
    transpile: ['d3', 'topojson-client']
  }
});
```

2. **app.vue** :
```vue
<template>
  <NuxtPage />
</template>
```

3. **pages/index.vue** :
```vue
<template>
  <div class="container">
    <MainMenu v-if="!gameStarted" @start-game="handleGameStart" />
    <GameContainer v-else :mode="gameMode" />
  </div>
</template>

<script setup>
const gameStarted = ref(false);
const gameMode = ref('desktop');

const handleGameStart = (mode) => {
  gameMode.value = mode;
  gameStarted.value = true;
};
</script>
```

4. **components/GameMap.client.vue** :
```vue
<template>
  <div ref="mapContainer" class="world-map"></div>
</template>

<script setup>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const props = defineProps({
  simulation: Object
});

const mapContainer = ref(null);

onMounted(async () => {
  const { initializeMap } = useMapLoader();
  await initializeMap(mapContainer.value, props.simulation);
});
</script>
```

5. **composables/useSimulation.ts** :
```typescript
export const useSimulation = () => {
  const state = reactive({
    isPaused: false,
    gameSpeed: 1,
    stats: {
      infected: 0,
      healthy: 8231613070,
      dead: 0
    },
    currentDate: new Date()
  });

  const start = () => {
    /* Implémentation de la boucle de simulation */
  };

  return { ...toRefs(state), start };
};
```

6. **composables/useVirus.ts** :
```typescript
export const useVirus = (initialParams) => {
  const virus = reactive(new Virus(initialParams));
  
  const generateProfile = async () => {
    /* Implémentation de la génération du profil */
  };

  return { virus, generateProfile };
};
```

7. **components/VirusCreator.vue** :
```vue
<template>
  <div class="virus-creator">
    <h2>Créateur de Virus</h2>
    <input v-model="virus.name" placeholder="Nom du virus" />
    
    <div class="property" v-for="prop in virusProperties" :key="prop.id">
      <label>{{ prop.label }}</label>
      <input 
        type="range" 
        v-model.number="virus[prop.key]" 
        :min="prop.min" 
        :max="prop.max"
      />
      <span>{{ virus[prop.key] }}%</span>
    </div>

    <button @click="generateVirus">Générer</button>
  </div>
</template>
```

Pour les appels API, créez un serveur Nitro :

8. **server/api/ai_completion.post.ts** :
```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // Implémentez l'appel à votre API AI ici
  return {
    profile: "Virus généré...",
    specialAbility: { ... }
  };
});
```

Pour les styles, conservez une structure similaire en utilisant SCSS :

9. **assets/styles/global.scss** :
```scss
.game-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  .world-map {
    height: 80vh;
    border: 1px solid #444;
  }
}

.virus-creator {
  .property {
    margin: 1rem 0;
    
    input[type="range"] {
      width: 100%;
    }
  }
}
```

Pour adapter le code D3 :

10. **composables/useMapLoader.ts** :
```typescript
export const useMapLoader = () => {
  const loadWorldMap = async (container, simulation) => {
    // Adaptation du code original avec Composition API
  };

  return { loadWorldMap };
};
```

Cette structure offre :
- Séparation claire des responsabilités
- Reactivité via Composition API
- Support SSR/SSG avec composants client-only
- Gestion d'état centralisée
- Code maintenable et extensible

Pour exécuter le projet :
```bash
npm install d3 topojson-client @nuxtjs/tailwindcss
npm run dev
```

Les principales adaptations incluent :
- Conversion des classes en composables
- Utilisation de la réactivité Vue
- Gestion des effets de bord avec les hooks de cycle de vie
- Découpage en composants réutilisables
- Adaptation des sélecteurs D3 en références DOM Vue
- Migration des styles vers SCSS modulaire

Cette architecture permet une meilleure maintenabilité tout en conservant la logique métier originale.