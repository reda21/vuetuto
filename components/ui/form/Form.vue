<template>
  <form
    @submit.prevent="submitForm"
    class="space-y-4 rounded-lg border p-4 shadow-md dark:bg-gray-800 dark:text-white"
  >
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineEmits(['submit']);

const submitForm = () => {
  emit('submit');
};
</script>
