<template>
  <div>
    <h3>enfant 1: {{ count }}</h3>
  </div>
</template>

<script setup lang="ts">
//inject provide parent count :number
const count = inject('count') as Ref<number>;



</script>
