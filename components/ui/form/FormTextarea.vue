<template>
  <div class="mb-6">
    <label :for="id" class="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
      {{ label }}
    </label>
    <textarea
      :class="[
        'focus:shadow-outline h-24 w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300',
        textareaClass,
        {
          'cursor-not-allowed opacity-50': disabled,
          'dark:text-gray-400': disabled && isDark,
        },
      ]"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
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
	placeholder: {
		type: String,
		default: "",
	},
	modelValue: {
		type: String,
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
	textareaClass: {
		type: String,
		default: "",
	},
});

defineEmits(["update:modelValue"]);
</script>
