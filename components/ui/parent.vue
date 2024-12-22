<template>
  <div>
    <h3>parent</h3>
    <slot>vide</slot>
  </div>
</template>

<script setup lang="ts">
const count = ref(5);

//provide count
provide('count', count)
</script>
