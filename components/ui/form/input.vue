<template>
  <input
    :type="type"
    :name="name"
    :id="id"
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    class="form-input"
  />
</template>

<script lang="ts" setup>
//props
type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local";

interface InputProps {
  type?: InputType;
  name?: string;
  id?: string;
  placeholder?: string;
  // value?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  disabled: false,
  placeholder: "",
  name: "input",
  id: "input",
});

//data
const model = defineModel();

/* :value="value"
defineEmits<{
  'update:value': [value: string]
}>();
 @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
*/
</script>
