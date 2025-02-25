<template>
  <FloatLabel variant="on">
    <InputText id="lolo" v-model="value" variant="filled" fluid />
    <label for="on_label">On Label</label>
</FloatLabel>
</template>

<script lang="ts" setup>
import FloatLabel from "primevue/floatlabel"
import InputText from "primevue/inputtext"

const value = ref(null);
/* 
<IftaLabel>
    <InputText id="username" v-model="value" variant="filled" />
    <label for="username">Username</label>
</IftaLabel>

*/
</script>

<style>

</style>