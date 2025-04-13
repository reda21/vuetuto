<template>
  <div>
    <div class="mb-4 grid gap-8 md:grid-cols-3 md:gap-5">
      <CardTuto categorie="php" />
      <CardTuto categorie="js" />
      <CardTuto categorie="css" />
    </div>
    <VButton label="Hello World" />
    <VInputText v-model="value" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default', // correspond au fichier layouts/blog.vue
});

const value = ref('');
</script>
