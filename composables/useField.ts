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
  FieldMeta,
} from '@/components/ui/form/formType';

export const useField = <T = any>({
  name,
  rules,
  options,
  initialValue,
}: UseFieldOptions<T>): UseFieldReturn<T> => {
  // 1. Injecte le contexte ; si absent, form sera `undefined`
  const form = inject<FormContext | undefined>(FormContextKey, undefined);

  const handleBlur = () => {
    form?.meta.setFieldTouched(name, true);
  };

  const handleChange = (e: Event) => {
    form?.asyncValidateWitchField(name);
  };

  const defaultMeta: FieldMeta = {
    path: name,
    touched: computed(() => false),
    valid: computed(() => true),
    validated: computed(() => false),
    dirty: computed(() => false),
    pending: computed(() => false),
    required: false,
    //   multiple: false,
  };

  const meta = form?.meta.getFieldMeta(name) ?? defaultMeta;
  const er = new CustomError();
  return {
    value: computed(() => initialValue as T),
    errors: form?.errors ?? er,
    hasError: computed(() => form?.errors.has(name) ?? false),
    oneError: computed(() => form?.errors.first(name) ?? null),
    errorList: computed(() => form?.errors.get(name) ?? []),
    handleBlur,
    handleChange,
    validateField: async () => false,
    meta,
  };
};
