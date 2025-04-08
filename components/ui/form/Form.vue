<template>
  <form novalidate @submit.prevent="onSubmit">
    <slot :lazy="lazy" :errors="errors" :inputs="values" :touched="touched" />
    <p class="cursor-pointer text-blue-500" @click="clicked">clicked</p>
    <pre>
      {{ 10 }}
    </pre>
  </form>
</template>

<script lang="ts" setup>
//components\ui\form\Form.vue
//@ts-ignore
import { Validator, type ValidatorOptions } from '@chantouchsek/validatorjs';
//@ts-ignore
import { withDefaults, defineProps, defineEmits } from 'vue';
import type { TypeInputs, TypeRule, ValidationRules } from './formType';
import { useForm } from '~/composables/useForm';
import { CustomError } from '@/utils/customError';

// Définition des props pour le composant Form
interface FormProps {
  /** Schéma de validation (ValidatorJS rules) */
  schema?: ValidationRules;
  /** Options pour ValidatorJS */
  options?: ValidatorOptions;
  /** Valeurs initiales du formulaire */
  initialValues?: Record<string, any>;
  /** États initiaux des champs touchés */
  initialTouched?: Record<string, boolean>;
}

// Valeurs par défaut pour les props
const props = withDefaults(defineProps<FormProps>(), {
  schema: () => ({}),
  options: () => ({}),
  initialValues: () => ({}),
});

// Initialisation du formulaire via useForm
const { values, errors, touched, handleSubmit, meta, setFieldValue, rules } = useForm({
  schema: props.schema,
  options: props.options,
  initialValues: props.initialValues,
  initialTouched: props.initialTouched,
});

const clicked = () => {
  console.log('setFieldTouched', true);
  setFieldValue('username', 'alberto');
};

// État "lazy" pour indiquer la soumission en cours
const lazy = ref(false);
provide('lazy', lazy);
provide('errors', errors);

// Fonction pour modifier l'état lazy depuis l'extérieur si besoin
const changeLazy = (val: boolean) => {
  lazy.value = val;
};
provide('changeLazy', changeLazy);

// Émission des événements "submit" et "invalid-submit"
const emit = defineEmits<{
  (e: 'submit', values: Record<string, any>): void;
  (e: 'invalid-submit', errors: Record<string, string>): void;
}>();

// Gestionnaire de soumission
const onSubmit = handleSubmit(
  (v) => emit('submit', v),
  (errs) => emit('invalid-submit', errs)
);
</script>
