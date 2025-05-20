<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useSocket } from "@/utils/socket"

const { socket } = useSocket()

onMounted(() => {
  socket.on("connect", () => {
    console.log("Socket connected");
  });

   socket.emit("message", { room: "home" });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});
</script>
