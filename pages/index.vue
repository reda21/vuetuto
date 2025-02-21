<template>
  <div
    class="dark:bg-dark-02 bg-light-02 border-light-b dark:border-dark-b flex min-h-screen flex-col items-center justify-center gap-4 border-2"
  >
    <h1 class="text-2xl font-bold">Compteur Nuxt</h1>
    <div class="flex items-center gap-4">
      <button
        @click="store.decrement"
        class="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
      >
        -
      </button>
      <span class="text-xl font-semibold">{{ store.count }}</span>
      <button
        @click="store.increment"
        class="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useCounterStore();

/*import { io } from "socket.io-client";


const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.info("is connected");
  // Obtenir l'heure actuelle et la formater en HH:MM:SS au format français
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("fr-FR", { hour12: false });

  // Envoyer l'heure formatée
  socket.emit("test", formattedTime);
}); */
</script>
