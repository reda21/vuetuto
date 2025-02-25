<template>
  <FloatLabel variant="on">
    <InputText id="on_label" v-model="value" autocomplete="off" fluid />
    <label for="on_label">On Label</label>
</FloatLabel>
</template>

<script lang="ts" setup>
import FloatLabel from "primevue/floatlabel"
import InputText from "primevue/inputtext"

const value = ref(null);
</script>

<style>

</style>