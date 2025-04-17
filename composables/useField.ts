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
  MetaField,
} from '@/components/ui/form/formType';

export function useField<T = any>({
  name,
  rules,
  options,
  initialValue,
}: UseFieldOptions<T>): UseFieldReturn<T> {
  const form = inject<FormContext>(FormContextKey);
  console.info('form', form);

  const handleBlur = () => {
    console.info('handleBlur');
  };

  const handleChange = (e: Event) => {
    console.info('handleChange', e);
  };

  const er = new CustomError();
  return {
    value: computed(() => initialValue as T),
    errors: er,
    hasError: er.has(name),
    handleBlur,
    handleChange,
    validateField: async () => false,
    
    meta: {
      path: name,
      touched: computed(() => false),
      valid: computed(() => true),
      validated: computed(() => false),
      dirty: computed(() => false),
      pending: false,
      required: false,
      errors: computed(() => form?.errors.get(name) ?? []),
      type: 'default',
      multiple: false,
    },
  };
}
