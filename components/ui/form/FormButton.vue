<template>
  <button
    :class="[
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
      buttonClass,
      { 'opacity-50 cursor-not-allowed': disabled },
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
