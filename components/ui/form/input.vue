<template>
  <InputText
    :id
    :name
    :type
    v-model="value"
    :placeholder="placeholder"
    :disabled
    :fluid
    :invalid
    :size
    :variant
  />
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
//props
type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {});

type sizeType = 'small' | 'large' | undefined | null;

interface InputProps {
  type?: InputType;
  name?: string;
  id?: string;
  placeholder?: string;
  // value?: string;
  disabled?: boolean;
  fluid?: boolean;
  size?: sizeType;
  invalid?: boolean | undefined | null;
  variant?: 'outlined' | 'filled' | undefined | null;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  placeholder: '',
  name: 'input',
  id: 'input',
  fluid: true,
  invalid: false,
});

//data
const value = defineModel<string | null>({ required: false, default: null });

/*
https://www.creative-tim.com/twcomponents/component/select-with-search
*/
</script>
