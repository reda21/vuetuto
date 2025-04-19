// composables/useValidator.ts
import { ref } from 'vue';
import { Validator } from '@chantouchsek/validatorjs';
import { CustomError } from '@/utils/customError';
import type {
  ValidationRules,
  FormContext,
  UseValidator,
  AddCustomRule,
  AddCustomAsyncRule,
  FormMeta,
  ValidationResult,
  SetFieldValue,
  SetValues,
  SetFieldDirty,
  SetDirty,
  SetAllDirty,
  SetFieldTouched,
  SetTouched,
  SetAllTouched,
} from '@/components/ui/form/formType';

export const useValidator: UseValidator = ({
  schema = {},
  options = {},
  initialValues = {},
  initialErrors = {},
  initialTouched = {},
  customMessages = {},
}) => {
  //init
  // on initialise values avec initialValues
  const values = reactive<Record<string, any>>(initialValues);
  const errors = new CustomError();
  const rules = new ValidationRulesManager(schema);

  const isValidated = ref(false);
  const pending = ref(false);
  const isSubmitting = ref(false);

  const touched = reactive<Record<string, boolean>>(
    Object.keys(values).reduce(
      (acc, key) => ({
        ...acc,
        [key]: initialTouched[key] || false,
      }),
      {}
    )
  );
  const dirty = reactive<Record<string, boolean>>(
    Object.keys(values).reduce(
      (acc, key) => ({
        ...acc,
        [key]: initialTouched[key] || false,
      }),
      {}
    )
  );

  Object.entries(initialErrors).forEach(([field, msg]) => errors.set(field, msg));

  const meta: ComputedRef<Partial<FormMeta>> = computed(() => ({
    pending: pending.value,
    valid: isValidated.value,
  }));

  setCustomRules();

  const validate = (): ValidationResult => {
    pending.value = true;
    runValidate(
      values,
      rules.getRules(),
      customMessages,
      () => {
        isValidated.value = true;
      },
      (er) => {
        errors.setAll(er);
        isValidated.value = false;
      }
    );
    pending.value = false;
    return {
      valid: isValidated.value,
      fails: !isValidated.value,
      errors,
      pending,
    };
  };

  const asyncValidateWitchField = (field: string) => {
    const fieldList = [field];
    const confirmation = rules.checkConfirmationField(field);
    
    if (confirmation)
      fieldList.push(confirmation);

    const same = rules.checkSameField(field);
    if (same) fieldList.push(same);
    
    errors.clearWith(fieldList);
    pending.value = true;

    runAsyncValidate(
      values,
      rules.getRules(fieldList),
      customMessages,
      () => {
        isValidated.value = true;
        pending.value = false;
      },
      (er) => {
        errors.setAll(er);
        isValidated.value = false;
        pending.value = false;
      }
    );
  }

  const asyncValidate = async (): Promise<ValidationResult> => {
    pending.value = true;
    errors.clearAll();
    runAsyncValidate(
      values,
      rules.getRules(),
      customMessages,
      () => {
        
        isValidated.value = true;
        pending.value = false;
      },
      (er) => {
        errors.setAll(er);
        isValidated.value = false;
        pending.value = false;
      }
    );

    return {
      valid: isValidated.value,
      fails: !isValidated.value,
      errors,
      pending,
    };
  };

  const setFieldValue: SetFieldValue = (field, value) => {
    values[field] = value;
    setFieldDirty(field, true);
    setFieldTouched(field, true);
    //   validateForm();
  };

  const setValues: SetValues = (fields) => {
    Object.entries(fields).forEach(([field, value]) => {
      values[field] = value;
      setFieldDirty(field, true);
      setFieldTouched(field, true);
    });
    //   validateForm();
  };

  const setFieldDirty: SetFieldDirty = (field, isDirty) => {
    if (field in dirty) {
      dirty[field] = isDirty;
    }
  };

  const setDirty: SetDirty = (fields) => {
    Object.entries(fields).forEach(([field, isDirty]) => {
      if (field in dirty) {
        dirty[field] = isDirty;
      }
    });
  };

  const setAllDirty: SetAllDirty = (isDirty) => {
    Object.keys(dirty).forEach((field) => {
      if (typeof isDirty === 'boolean') {
        dirty[field] = isDirty;
      }
    });
  };

  const setFieldTouched: SetFieldTouched = (field, isTouched) => {
    if (field in touched) {
      touched[field] = isTouched;
    }
  };

  const setTouched: SetTouched = (fields) => {
    Object.entries(fields).forEach(([field, isTouched]) => {
      if (field in touched) {
        touched[field] = isTouched;
      }
    });
  };

  const setAllTouched: SetAllTouched = (isTouched) => {
    Object.keys(touched).forEach((field) => {
      if (typeof isTouched === 'boolean') {
        touched[field] = isTouched;
      }
    });
  };

  return {
    addCustomRule,
    addCustomAsyncRule,
    validate,
    asyncValidate,
    asyncValidateWitchField,
    setFieldValue,
    setValues,
    setFieldDirty,
    setDirty,
    setAllDirty,
    setFieldTouched,
    setTouched,
    setAllTouched,
    values,
    errors,
    meta,
    rules,
    touched,
    dirty,
    isValidated,
    pending,
    isSubmitting,
  };
};

// Ajouter une règle personnalisée (synchrone)
const addCustomRule: AddCustomRule = (ruleName, callback, errorMessage) => {
  Validator.register(ruleName, callback, errorMessage);
};

// Ajouter une règle personnalisée (asynchrone)
const addCustomAsyncRule: AddCustomAsyncRule = (ruleName, callback, errorMessage) => {
  Validator.registerAsync(ruleName, callback, errorMessage);
};

const setCustomRules = () => {
  addCustomAsyncRule(
    'username_available',
    (username, attribute, req, passes) => {
      fetch(`/api/users/check-username?username=${encodeURIComponent(username)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.available) passes();
          else passes(false, "Le nom d'utilisateur est déjà pris.");
        })
        .catch(() => {
          passes(false, 'Impossible de vérifier la disponibilité.');
        });
    },
    "Le champ :attribute n'est pas disponible."
  );
};

const runValidate = (
  values: Record<string, any>,
  rules: Record<string, string[]>,
  customMessages?: Record<string, any>,
  passes?: () => void,
  fails?: (errors: Record<string, string[]>) => void
): void => {
  const validation = new Validator(values, rules, customMessages);

  validation.passes() ? passes?.() : fails?.(validation.errors.all());
};

const runAsyncValidate = async (
  values: Record<string, any>,
  rules: Record<string, string[]>,
  customMessages?: Record<string, any>,
  passes?: () => void,
  fails?: (errors: Record<string, string[]>) => void
) => {
  const validation = new Validator(values, rules, customMessages);
  validation.checkAsync(passes, () => fails?.(validation.errors.all()));
};
// This closing brace appears to be extra and should be removed as it doesn't match any opening brace
