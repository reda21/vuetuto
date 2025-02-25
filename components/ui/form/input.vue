<template>
  <InputText type="text" v-model="value" :placeholder="placeholder" :disabled="disabled" :fluid="fluid" :size="size"/>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
//props
type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local';

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
  fluid: true
});

//data
const value = defineModel<string | null>({ required: false, default: null });

/* :value="value"
defineEmits<{
  'update:value': [value: string]
}>();
 @input="$emit('update:value', ($event.target as HTMLInputElement).value)"

<input
    :type="type"
    :name="name"
    :id="id"
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    class="form-input"
  />

*/
</script>
