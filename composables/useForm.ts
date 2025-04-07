// ~/composables/useForm.ts
import { reactive, provide } from 'vue';
import { Validator } from '@chantouchsek/validatorjs';
import { CustomError } from '@/utils/customError';
import type {
  ValidatorOptions,
  ValidationRules,
  FormContext,
  UseFormType,
} from '@/components/ui/form/formType';

export const FormContextKey = Symbol('FormContext');



export function useForm<UseFormType>(rules = {}, options = {}) {
  // On déclare values, errors et touched indexables par string
  const values = reactive<Record<string, any>>({});
  const errors = new CustomError();
  const touched = reactive<Record<string, boolean>>({});

  // Validation complète du formulaire
  async function validateForm() {
    if (!rules) return;
    console.info('validateForm', values);
    const validation = new Validator(values, rules, options);
    if (validation.fails()) {
      const allErrors = validation.errors.all();
      // reset
      errors.clearAll();
      // populate
      Object.entries(allErrors).forEach(([f, msgs]) => {
        errors.set(f, msgs);
      });
    } else {
      // plus d'erreurs
      errors.clearAll();
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
      const hasErrors = Object.values(errors.all()).some((msg) => !!msg);
      if (!hasErrors) onValid(values);
      else onInvalid?.(errors.all());
    };
  }

  const ctx: FormContext = { values, errors, touched, rules, handleSubmit };
  provide(FormContextKey, ctx);
  return ctx;
}
