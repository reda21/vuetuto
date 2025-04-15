<template>
  <div class="flex flex-wrap gap-2">
    <template v-for="(tag, idx) in modelValue" :key="idx">
      <span :class="tagClass(disabled ?? false)" class="flex items-center px-2 py-1 rounded text-xs font-medium mr-1 mb-1"></span>
        {{ tag }}
        <button v-if="!disabled" type="button" class="ml-1 focus:outline-none" @click="removeTag(idx)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    </span>

    </template>
    <input
      v-if="!disabled"
      ref="inputRef"
      v-model="input"
      @keydown.enter.prevent="addTag"
      @keydown.tab.prevent="addTag"
      @keydown.188.prevent="addTag"
      @blur="addTag"
      class="bg-light-input dark:bg-dark-input px-2 py-1 rounded text-xs outline-none min-w-[80px]"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

interface InputTagsProps {
  modelValue: string[];
  disabled?: boolean;
  placeholder?: string;
}

const props = defineProps<InputTagsProps>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const input = ref<string>('');
const inputRef = ref<HTMLInputElement | null>(null);

function addTag(): void {
  const val = input.value.trim();
  if (val && !props.modelValue.includes(val)) {
    emit('update:modelValue', [...props.modelValue, val]);
  }
  input.value = '';
}

function removeTag(idx: number): void {
  if (props.disabled) return;
  const tags = [...props.modelValue];
  tags.splice(idx, 1);
  emit('update:modelValue', tags);
}

function tagClass(isDisabled: boolean): string[] {
  return [
    isDisabled
      ? 'bg-light-input-disabled dark:bg-dark-input-disabled'
      : 'bg-light-input dark:bg-dark-input',
    'transition-colors'
  ];
}

watch(
  () => props.disabled,
  (val) => {
    if (!val) inputRef.value?.focus();
  }
);
</script>

<style scoped>
.bg-light-input {
  background-color: #f3f4f6;
  color: #222;
}
.bg-light-input-disabled {
  background-color: #e5e7eb;
  color: #aaa;
}
.bg-dark-input {
  background-color: #23272f;
  color: #eee;
}
.bg-dark-input-disabled {
  background-color: #2d323b;
  color: #888;
}
</style>