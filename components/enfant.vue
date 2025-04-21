<template>
  <div>
    <p class="text-light-font dark:text-dark-font">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Incrémenter</button>
    <button @click="decrement" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Décrémenter</button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const count = inject<number>('count')
const increment = inject<() => void>('increment')
const decrement = inject<() => void>('decrement')
const double = inject<number>('double')
</script>

<style></style>
