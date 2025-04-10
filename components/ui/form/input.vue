<template>
  <InputText
    v-model="value"
    :id="id"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :fluid="fluid"
    :invalid="invalidComputed"
    :size="size"
    :variant="variant"
    @input="handleChange"
    @blur="handleBlur"
  />
</template>

<script lang="ts" setup>
//components\ui\form\input.vue
//@ts-ignore
import { withDefaults, defineProps, defineModel, inject } from 'vue';
//@ts-ignore
import InputText from 'primevue/inputtext';
import { CustomError } from '@/utils/customError';
import { useField } from '~/composables/useField';
import type { InputProps } from './formType';
//props

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  placeholder: '',
  name: 'input',
  id: 'input',
  fluid: true,
  invalid: false,
  size: null,
  variant: null,
  lazy: false,
});

//get model value
const value = defineModel<string | null>({ required: false, default: null });

//useField
const { handleChange, handleBlur, errors } = useField({
  name: props.name,
  initialValue: value.value,
  rules: props.rules,
});

//get error value
//const errors = inject<CustomError>('errors');

//computed
const invalidComputed = computed(() => {
  return props.invalid || errors?.has(props.name);
});

//methods
const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};
</script>
