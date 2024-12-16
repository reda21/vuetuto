<template>
  <div
    class="dark:bg-gray-800 flex flex-col items-center justify-center min-h-screen gap-4"
  >
    <h1 class="text-2xl font-bold">Compteur Nuxt</h1>
    <div class="flex items-center gap-4">
      <button
        @click="store.decrement"
        class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
      >
        -
      </button>
      <span class="text-xl font-semibold">{{ store.count }}</span>
      <button
        @click="store.increment"
        class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
const store = useCounterStore();

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.info("is connected");
  // Obtenir l'heure actuelle et la formater en HH:MM:SS au format français
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("fr-FR", { hour12: false });

  // Envoyer l'heure formatée
  socket.emit("test", formattedTime);
});
</script>
