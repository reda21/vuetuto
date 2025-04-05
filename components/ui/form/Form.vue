<template>
  <form @submit.prevent="submitForm">
    <slot :lazy="lazy" :errors="errors" />
    <p>{{ lazy }}</p>
  </form>
</template>

<script lang="ts" setup>
//@ts-ignore
import { Validator } from '@chantouchsek/validatorjs';
import type { TypeInputs, TypeRule } from "./formType"
import { CustomError } from "@/utils/customError"


//props
interface FormProps {
  inputs: TypeInputs;
  rules: TypeRule;
}

//@ts-ignore
const props = withDefaults(defineProps<FormProps>(), {
  inputs: () => ({}),
  rules: () => ({}),
});

//emit
//@ts-ignore
const emit = defineEmits(['submit']);

//data
const lazy = ref(false);
const errors = new CustomError()

//provide
provide('lazy', lazy);
provide('errors', errors);



//methods
const chengeLazy = (value: boolean) => {
  lazy.value = value;
};


const submitForm = () => {
  errors.clearAll();
  const validator = new Validator(props.inputs, props.rules);
  const validationRéussie = validator.passes()
  if (validationRéussie)
    console.info("success")
  else {
    errors.setAll(validator.errors.all())
    console.error(validator.errors)
  }
  //  emit('submit', { chengeLazy });
};
</script>
