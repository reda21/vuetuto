<template>
  <FloatLabel>
    <InputText id="username" v-model="value" fluid />
    <label for="username">Username</label>
</FloatLabel>
</template>

<script lang="ts" setup>
import FloatLabel from "primevue/floatlabel"
import InputText from "primevue/inputtext"

const value = ref(null);
</script>

<style>

</style>