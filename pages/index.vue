<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-4">
    <h1 class="text-2xl font-bold">Compteur Nuxt</h1>
    <div class="flex items-center gap-4">
      <button @click="store.decrement"
        class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
        -
      </button>
      <span class="text-xl font-semibold">{{ store.count }}</span>
      <button @click="store.increment"
        class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useCounterStore();


</script>
