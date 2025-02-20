<template>
  <div class="mb-4">
    <label
      :for="id"
      class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
    >
      {{ label }}
    </label>
    <input
      :class="[
        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-700',
        inputClass,
        {
          'opacity-50 cursor-not-allowed': disabled,
          'dark:text-gray-400': disabled && isDark,
        },
      ]"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDarkMode } from "~/composables/useDarkMode";

const { isDark } = useDarkMode();

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
