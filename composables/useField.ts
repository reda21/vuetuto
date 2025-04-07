// ~/composables/useField.ts
import { inject, computed } from 'vue';
import { Validator, type ValidatorOptions } from '@chantouchsek/validatorjs';
import { FormContextKey } from './useForm';
import { CustomError } from '@/utils/customError';
import type {
  ValidationRules,
  FormContext,
  UseFieldOptions,
  UseFieldReturn,
} from '@/components/ui/form/formType';

export function useField<T = any>({
  name,
  rules,
  options,
  initialValue,
}: UseFieldOptions<T>): UseFieldReturn<T> {
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
    form.errors.clear(name);
    form.touched[name] = false;
  }

  const value = computed({
    get: () => form.values[name],
    set: (v) => (form.values[name] = v),
  });
  const errorMessage = computed(() => form.errors.first(name));
  const meta = {
    touched: computed(() => form.touched[name]),
    valid: computed(() => !form.errors.has(name)),
  };

  // Validation de ce seul champ
  async function validateField() {    
    if (!fieldRules) return;
    const singleRule = { [name]: fieldRules };
    const validation = new Validator(form.values, singleRule, options);
    if (validation.fails()) {      
      form.errors.setOne(name, validation.errors.first(name));
    } else {
      form.errors.clear(name);
    }
  }

  function handleBlur() {    
    form.touched[name] = true;
    validateField();
  }
  function handleChange(e: Event) {
   // form.errors.clear(name);    
    const t = e.target as HTMLInputElement;
    value.value = t.value;
  }

  return { value, errors: form.errors, handleBlur, handleChange, meta };
}
