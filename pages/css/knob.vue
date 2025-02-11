<template>
  <div class="card flex flex-col items-center gap-2">
    <Knob v-model="value" :min="0" :max="20" :size="150" readonly />
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="value++" :disabled="value >= 20" />
      <Button icon="pi pi-minus" @click="value--" :disabled="value <= 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from "primevue/knob";
import Button from "primevue/button";

const value = ref(0);
</script>

<style></style>
