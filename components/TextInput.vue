<script setup lang="ts">
//@ts-ignore
import { toRef, defineProps } from 'vue';
//@ts-ignore
import { useField } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});
//https://huggingface.co/spaces/enzostvs/deepsite
const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div class="mb-4">
    <label
      :class="!errorMessage ? 'text-success' : 'text-danger'"
      :for="name"
      class="mb-1 block w-full"
      >{{ label }}</label
    >
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="bg-light-bg dark:bg-dark-input focus:border-primary w-full rounded border-2 p-2 transition-colors duration-300 ease-in-out focus:outline-none"
      :class="{
        'border-transparent bg-gray-100': !errorMessage && !meta.valid,
        'text-error border-danger': !!errorMessage,
        'text-success border-success': meta.valid,
      }"
    />

    <p :class="!errorMessage ? 'text-success' : 'text-danger'" class="text-sm" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>
