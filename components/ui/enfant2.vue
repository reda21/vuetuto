<template>
  <div>
    <h3>enfant 2</h3>
    <button @click="count++">incrementer</button>
  </div>
</template>

<script setup lang="ts">
//inject provide parent count :number
const count = inject("count") as Ref<number>;
</script>
