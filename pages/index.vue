<template>
  <div class="grid gap-8 md:grid-cols-3 md:gap-5">
    <CardTuto categorie="php" />
    <CardTuto categorie="js" />
    <CardTuto categorie="css" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default', // correspond au fichier layouts/blog.vue
});
</script>
