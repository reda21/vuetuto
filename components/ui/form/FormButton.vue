<template>
  <button
    :class="[
      'focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none',
      buttonClass,
      { 'cursor-not-allowed opacity-50': disabled },
    ]"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="!isLoading">{{ label }}</span>
    <span v-else>Envoi en cours...</span>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  buttonClass: {
    type: String,
    default: "",
  },
});
</script>
