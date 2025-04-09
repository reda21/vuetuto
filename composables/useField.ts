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

  if (rules) {
    form.rules?.addRule(name, rules as string | string[]);
  }

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

  const meta = {
    touched: computed(() => form.touched[name]),
    valid: computed(() => !form.errors.has(name)),
  };

  // Validation de ce seul champ
  async function validateField() {
    const fieldRules = form.rules?.getFieldRules(name);

    // Si fieldRules est indéfini ou nul, retourner true
    if (!fieldRules) return true;

    // S'assurer que fieldRules est un tableau de chaînes
    const rulesArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules];

    // Vérifier si c'est un champ de confirmation (se terminant par '_confirmation')
    const isConfirmationField = name.endsWith('_confirmation');
    const relatedField = isConfirmationField ? name.replace('_confirmation', '') : null;

    // Vérifier si la règle contient 'same'
    const hasSameRule = rulesArray.some(
      (rule) => typeof rule === 'string' && rule.startsWith('same:')
    );

    const hasConfirmedRule = Array.isArray(fieldRules)
      ? fieldRules.includes('confirmed')
      : typeof fieldRules === 'string'
        ? fieldRules === 'confirmed'
        : false;

    // Valider le champ courant
    const singleRule = { [name]: fieldRules };
    const validation = new Validator(form.values, singleRule, options);

    if (validation.fails()) {
      form.errors.setOne(name, validation.errors.first(name));
      return false;
    } else {
      form.errors.clear(name);
    }

    // Si c'est un champ de confirmation ou contient une règle 'same', valider aussi le champ lié
    if ((isConfirmationField || hasSameRule || hasConfirmedRule) && relatedField) {
      const relatedRules = form.rules?.getFieldRules(relatedField);
      if (relatedRules) {
        const relatedValidation = new Validator(
          form.values,
          { [relatedField]: relatedRules },
          options
        );
        if (relatedValidation.fails()) {
          form.errors.setOne(relatedField, relatedValidation.errors.first(relatedField));
          return false;
        } else {
          form.errors.clear(relatedField);
        }
      }
    }

    return true;
  }

  const handleBlur = () => {};
  const handleChange = () => {
    validateField();
  };

  return {
    value: value as Ref<T>, //
    errors: form.errors,
    handleBlur,
    handleChange,
    validateField, // Add the validateField function here
    meta: {
      // Keep the existing implementation for meta.touched and meta.valid for now
      // Use the computed properties defined earlier
      touched: meta.touched,
      valid: meta.valid,
    },
  };
}
