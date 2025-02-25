<template>
  <FloatLabel>
    <InputText id="over_label" v-model="value" fluid />
    <label for="over_label">Over Label</label>
</FloatLabel>
</template>

<script lang="ts" setup>
const value = ref(null);
</script>

<style>

</style>