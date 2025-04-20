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
    validate,
    meta,
    asyncValidate,
    asyncValidateWitchField,
  } = useValidator({
    schema,
    initialValues,
    customMessages,
  });

  const asyncValidators = ref<Record<string, (value: any) => Promise<boolean | string>>>({});

  function handleSubmit(
    onValid: (vals: Record<string, any>) => void,
    onInvalid?: (errs: Record<string, string>) => void
  ) {
    return async (e?: Event) => {
      e?.preventDefault?.();
      meta.setAllTouched(true);

      const { valid, errors } = await asyncValidate();
      valid ? onValid(values) : onInvalid?.(errors.all());
    };
  }

  function setFieldValue(field: string, value: any) {
    values[field] = value;
    meta.setFieldDirty(field, true);
    meta.setFieldTouched(field, true);
    //    validateForm();
  }

  function setValues(fields: Record<string, any>) {
    Object.entries(fields).forEach(([field, value]) => {
      values[field] = value;
      meta.setFieldDirty(field, true);
      meta.setFieldTouched(field, true);
    });
    //   validateForm();
  }

  const ctx: FormContext = {
    values,
    errors,
    rules,
    handleSubmit,
    asyncValidateWitchField,
    meta,
    setFieldValue,
    setValues,    
    //    validateForm,    
    resetForm: () => {
      /*    Object.keys(values).forEach((key) => {
        values[key] = initialValues[key] || '';
        touched[key] = false;
        dirty[key] = false;
      });
      errors.clearAll(); */
    },
    asyncValidators,
  };
  provide(FormContextKey, ctx);
  return {
    values,
    errors,
    rules,
    handleSubmit,
    meta: meta.getFormMeta(),
  };
}
