// ~/composables/useField.ts
import { inject, computed } from 'vue';
import { Validator, type ValidatorOptions } from '@chantouchsek/validatorjs';
import { FormContextKey } from './useForm';
import type { FormContext, ValidationRules } from './useForm';

export function useField<T = any>(
  name: string,
  rules?: ValidationRules,
  options?: ValidatorOptions,
  initialValue?: T
) {
  // On retire le paramètre générique ici :
  const maybeForm = inject<FormContext>(FormContextKey);
  if (!maybeForm) {
    throw new Error('useField doit être utilisé à l’intérieur d’un <Form>.');
  }
  const form = maybeForm; // TS sait maintenant que form est non-undefined

  // Récupérer les règles globales du formulaire si elles existent
  const globalRules = form.rules ? form.rules[name] : undefined;

  // Fusionner les règles locales et globales
  const fieldRules = rules || globalRules;
  // Initialisation
  if (!(name in form.values)) {
    form.values[name] = initialValue ?? '';
    form.errors[name] = '';
    form.touched[name] = false;
  }

  const value = computed({
    get: () => form.values[name],
    set: (v) => (form.values[name] = v),
  });
  const errorMessage = computed(() => form.errors[name]);
  const meta = {
    touched: computed(() => form.touched[name]),
    valid: computed(() => !form.errors[name]),
  };

  // Validation de ce seul champ
  async function validateField() {
    console.info('validateField', fieldRules);
    if (!fieldRules) return;
    const singleRule = { [name]: fieldRules };
    const validation = new Validator(form.values, singleRule, options);
    if (validation.fails()) {
      form.errors[name] = validation.errors.first(name) || '';
    } else {
      form.errors[name] = '';
    }
  }

  function handleBlur() {
    console.info('handleBlur');
    form.touched[name] = true;
    validateField();
  }
  function handleChange(e: Event) {
    console.info('handleChange');
    const t = e.target as HTMLInputElement;
    value.value = t.value;
  }

  return { value, errorMessage, handleBlur, handleChange, meta };
}
