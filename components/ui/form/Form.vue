<template>
  <form novalidate @submit.prevent="onSubmit">
    <slot :lazy="lazy" :errors="errors" :values="values" :touched="touched" />
    <p>{{ lazy }}</p>
  </form>
</template>

<script lang="ts" setup>
//@ts-ignore
import { Validator, type ValidatorOptions } from '@chantouchsek/validatorjs';
import type { TypeInputs, TypeRule, ValidationRules } from './formType';
import { useForm } from '~/composables/useForm';
import { CustomError } from '@/utils/customError';

//props
interface FormProps {
  validationRules?: ValidationRules;
  validationOptions?: ValidatorOptions;
}

//@ts-ignore
const props = withDefaults(defineProps<FormProps>(), {
  validationRules: () => ({}),
  validationOptions: () => ({}),
});

//useForm
const { values, errors, touched, handleSubmit } = useForm(
  props.validationRules,
  props.validationOptions
);

//emit
//@ts-ignore
const emit = defineEmits<{
  (e: 'submit', values: Record<string, any>): void;
  (e: 'invalid-submit', errors: Record<string, string>): void;
}>();

//data
const lazy = ref(false);
//const errors = new CustomError();

//provide
provide('lazy', lazy);
provide('errors', errors);

//methods
const chengeLazy = (value: boolean) => {
  lazy.value = value;
};

const onSubmit = handleSubmit(
  (v) => emit('submit', v),
  (errs) => emit('invalid-submit', errs)
);

const submitForm = () => {
  /* 
  errors.clearAll();
  const validator = new Validator(props.inputs, props.rules);
  const validationRéussie = validator.passes();
  if (validationRéussie) console.info('success');
  else {
    errors.setAll(validator.errors.all());
    console.error(validator.errors);
  }
  //  emit('submit', { chengeLazy });
  */
};
</script>
