// ~/composables/useForm.ts
import { reactive, provide, computed } from 'vue';
import { Validator, type ValidatorOptions } from '@chantouchsek/validatorjs';
import { CustomError } from '@/utils/customError';
import { ValidationRulesManager } from '@/utils/validationRulesManager';
import type { ValidationRules, FormContext } from '@/components/ui/form/formType';
import Vaalidate from '~/components/vaalidate.vue';
import { isValidDate } from '../utils/date';

export const FormContextKey = Symbol('FormContext');

interface UseFormOptions {
  schema?: ValidationRules;
  options?: ValidatorOptions;
  initialValues?: Record<string, any>;
  initialErrors?: Record<string, string>;
  initialTouched?: Record<string, boolean>;
  customMessages?: Record<string, any>;
}

// Modify existing useForm.ts
export function useForm({
  schema = {},
  options = {},
  initialValues = {},
  initialErrors = {},
  initialTouched = {},
  customMessages = {},
}: UseFormOptions) {
  // on initialise values avec initialValues
  const {
    values,
    errors,
    rules,
    touched,
    dirty,
    isSubmitting,
    isValidating,
    isValidated,
    validate,
    asyncValidate,
    setDirty,
    setFieldDirty,
    setAllDirty,
    setTouched,
    setFieldTouched,
    setAllTouched,
  } = useValidator({
    schema,
    initialValues,
    customMessages,
  });

  const asyncValidators = ref<Record<string, (value: any) => Promise<boolean | string>>>({});

  const validateForm = async (): Promise<boolean> => {
    isValidating.value = true;
    try {
      const validation = new Validator(values, rules.getRules(), {
        customMessages: validationMessages,
        ...options,
      });
      isValidated.value = true;
      if (validation.fails()) {
        const allErrors = validation.errors.all();
        errors.clearAll();
        Object.entries(allErrors).forEach(([field, msgs]) => {
          errors.set(field, msgs);
        });
        return false;
      } else {
        errors.clearAll();
        return true;
      }
    } finally {
      isValidating.value = false;
    }
  };

  function handleSubmit(
    onValid: (vals: Record<string, any>) => void,
    onInvalid?: (errs: Record<string, string>) => void
  ) {
    return async (e?: Event) => {
      e?.preventDefault?.();
      setAllTouched(true);

      const { valid, errors } = await asyncValidate();
      valid ? onValid(values) : onInvalid?.(errors.all());
    };
  }

  const meta = computed(() => ({
    touched: Object.values(touched).some(Boolean),
    dirty: Object.values(dirty).some(Boolean),
    valid: !Object.values(errors.all()).some(Boolean),
    pending: isValidating.value,
    validated: isValidated.value,
    initialValues,
    values,
  }));

  function setFieldValue(field: string, value: any) {
    values[field] = value;
    setFieldDirty(field, true);
    setFieldTouched(field, true);
    validateForm();
  }

  function setValues(fields: Record<string, any>) {
    Object.entries(fields).forEach(([field, value]) => {
      values[field] = value;
      setFieldDirty(field, true);
      setFieldTouched(field, true);
    });
    validateForm();
  }

  const ctx: FormContext = {
    values,
    errors,
    touched,
    dirty,
    rules,
    handleSubmit,
    isSubmitting,
    isValidating,
    isValidated,
    meta,
    setFieldValue,
    setValues,
    setFieldTouched,
    setTouched,
    validateForm,
    setDirty,
    setFieldDirty,
    resetForm: () => {
      Object.keys(values).forEach((key) => {
        values[key] = initialValues[key] || '';
        touched[key] = false;
        dirty[key] = false;
      });
      errors.clearAll();
    },
    asyncValidators,
  };
  provide(FormContextKey, ctx);
  return ctx;
}
