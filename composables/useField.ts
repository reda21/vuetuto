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
  // 1. Injecte le contexte ; si absent, form sera `undefined`
  const form = inject<FormContext | undefined>(FormContextKey, undefined);

  const handleBlur = () => {
    form?.meta.setFieldTouched(name, true);
  };

  const handleChange = (e: Event) => {
    form?.asyncValidateWitchField(name);
  };

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

    meta: form?.meta.getFieldMeta(name) as MetaField ?? {
      path: name,
      touched: computed(() => false),
      valid: computed(() => true),
      validated: computed(() => false),
      dirty: computed(() => false),
      pending: false,
      required: false,      
   //   multiple: false,
    }
  };
}

/*
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

  // Validation de ce seul champ
  async function validateField() {
    const fieldRules = form.rules?.getFieldRules(name);

    // Si fieldRules est indéfini ou nul, retourner true
    if (!fieldRules) return true;

    const validation = new Validator(form.values, form.rules.getRules(), {
      customMessages: validationMessages,
      ...options,
    });

    form.isValidated.value = true;

    if (validation.fails()) {
      if (validation.errors.has(name)) form.errors.setOne(name, validation.errors.first(name));
      else form.errors.clear(name);
    } else {
      if (form.errors.has(name)) form.errors.clear(name);
    }

    const confirmation = form.rules.checkConfirmationField(name);

    if (confirmation) {
      if (validation.fails()) {
        if (validation.errors.has(confirmation))
          form.errors.setOne(confirmation, validation.errors.first(confirmation));
        else form.errors.clear(confirmation);
      } else {
        if (form.errors.has(confirmation)) form.errors.clear(confirmation);
      }
    }

    const same = form.rules.checkSameField(name);
    console.info('same', same);
    if (same) {
      if (validation.fails()) {
        if (validation.errors.has(same)) form.errors.setOne(same, validation.errors.first(same));
        else form.errors.clear(same);
      } else {
        if (form.errors.has(same)) form.errors.clear(same);
      }
    }

    return true;
  }

  const handleBlur = () => {
    form.setFieldTouched(name, true);
  };
  const handleChange = () => {
    console.info("change", name);
    form.setFieldDirty(name, true);
    validateField();
  };

  const meta: MetaField = {
    path: name,
    touched: computed(() => form.touched[name]),
    valid: computed(() => !form.errors.has(name)),
    validated: computed(() => form.isValidated.value),
    dirty: computed(() => form.dirty[name]),
    pending: false,
    required: form.rules.isRequired(name),
    errors: computed(() => form.errors.get(name) ?? []),
    type: 'default',
    multiple: false,
  };

  return {
    value: value as Ref<T>, //
    errors: form.errors,
    handleBlur,
    handleChange,
    validateField, // Add the validateField function here
    meta,
  };
}

*/
