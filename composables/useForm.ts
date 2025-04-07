// ~/composables/useForm.ts
import { reactive, provide } from 'vue';
import { Validator, type ValidatorOptions } from '@chantouchsek/validatorjs';

export type ValidationRules = Record<string, string | string[]>;

export interface FormContext {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  rules?: ValidationRules; // Ajout de la propriété rules
  handleSubmit: (
    onValid: (values: Record<string, any>) => void,
    onInvalid?: (errors: Record<string, string>) => void
  ) => (e?: Event) => Promise<void>;
}

export const FormContextKey = Symbol('FormContext');

export function useForm(rules?: ValidationRules, options?: ValidatorOptions): FormContext {
  // On déclare values, errors et touched indexables par string
  const values = reactive<Record<string, any>>({});
  const errors = reactive<Record<string, string>>({});
  const touched = reactive<Record<string, boolean>>({});

  // Validation complète du formulaire
  async function validateForm() {
    if (!rules) return;

    const validation = new Validator(values, rules, options);
    if (validation.fails()) {
      const allErrors = validation.errors.all();
      // reset
      Object.keys(errors).forEach((f) => (errors[f] = ''));
      // populate
      Object.entries(allErrors).forEach(([f, msgs]) => {
        errors[f] = (msgs as string[])[0] || '';
      });
    } else {
      // plus d'erreurs
      Object.keys(errors).forEach((f) => (errors[f] = ''));
    }
  }

  // Génère la fonction à binder sur @submit
  function handleSubmit(
    onValid: (values: Record<string, any>) => void,
    onInvalid?: (errors: Record<string, string>) => void
  ) {
    return async (e?: Event) => {
      e?.preventDefault?.();
      // on marque tous les champs comme touchés
      Object.keys(values).forEach((f) => (touched[f] = true));
      await validateForm();
      const hasErrors = Object.values(errors).some((msg) => !!msg);
      if (!hasErrors) onValid(values);
      else onInvalid?.(errors);
    };
  }

  const ctx: FormContext = { values, errors, touched, rules, handleSubmit };
  provide(FormContextKey, ctx);
  return ctx;
}
