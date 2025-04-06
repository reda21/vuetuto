<template>
  <InputText v-model="value" :id="id" :name="name" :type="type" :placeholder="placeholder" :disabled="disabled" :fluid="fluid" :invalid="invalidComputed" :size="size" :variant="variant" @input="!props.lazy ? inputChange($event) : null" @blur="props.lazy ? inputChange($event) : null" />
</template>

<script lang="ts" setup>
//@ts-ignore
import { withDefaults, defineProps, defineModel, inject } from "vue"
//@ts-ignore
import InputText from 'primevue/inputtext';
import { CustomError } from "@/utils/customError"

import type { InputProps } from "./formType"
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

//get error value
const errors = inject<CustomError>('errors')

//computed
const invalidComputed = computed(() => {
  return errors?.has(props.name) || props.invalid
})

//methods
const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

const inputChange = debounce((event: Event) => {
  errors?.clear(props.name);
  console.log("inputChange");
}, props.lazy ? 0 : 300);
/*
https://www.creative-tim.com/twcomponents/component/select-with-search
*/
</script>
