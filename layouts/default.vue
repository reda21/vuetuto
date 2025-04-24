<template>
  <div>
    <Navbar />
    <div class="container mx-auto px-4 py-4 md:px-0">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'min-h-screen bg-theme transition-colors duration-300', // Ajoute la classe au body
  },
});
</script>
