<template>
  <form
    @submit.prevent="submitForm"
    class="space-y-4 p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:text-white"
  >
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineEmits(["submit"]);

const submitForm = () => {
  emit("submit");
};
</script>
