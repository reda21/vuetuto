// ~/composables/useForm.ts
import { provide } from 'vue';
import type { FormContext, UseForm } from '@/components/ui/form/formType';

export const FormContextKey = Symbol('FormContext');
export const PendingKey = Symbol('pending');

// Modify existing useForm.ts
export const useForm: UseForm = ({
  schema = {},
  options = {},
  initialValues = {},
  initialErrors = {},
  initialTouched = {},
  customMessages = {},
}) => {
  // on initialise values avec initialValues
  const { values, errors, rules, validate, meta, asyncValidate, asyncValidateWitchField } =
    useValidator({
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
  provide(PendingKey, meta.isPending);

  return {
    values,
    errors,
    rules,
    handleSubmit,
    meta: meta.getFormMeta(),
    setFieldValue,
  };
};
