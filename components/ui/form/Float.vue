<template>
  <FloatLabel>
    <InputText id="over_label" v-model="value" fluid />
    <label for="over_label">Over Label</label>
</FloatLabel>
</template>

<script lang="ts" setup>
import FloatLabel from "primevue/floatlabel"
import InputText from "primevue/inputtext"

const value = ref(null);
</script>

<style>

</style>