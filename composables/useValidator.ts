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
  const isValidating = ref(false);
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
    pending: isValidating.value,
    valid: isValidated.value,
  }));

  setCustomRules();

  const validate = (): ValidationResult => {
    isValidating.value = true;

    const validation = new Validator(values, rules.getRules(), customMessages);
    if (validation.passes()) {
      isValidated.value = true;
    } else {
      errors.setAll(validation.errors.all());
      isValidated.value = false;
    }
    isValidating.value = false;

    return {
      valid: isValidated.value,
      fails: !isValidated.value,
      errors,
      isValidating,
    };
  };

  const asyncValidate = async (): Promise<ValidationResult> => {
    isValidating.value = true;

    const validation = new Validator(values, rules.getRules(), customMessages);

    try {
      await new Promise<void>((resolve, reject) => {
        validation.checkAsync(
          () => resolve(), // passes
          () => reject(validation.errors.all()) // fails
        );
      });
      errors.clearAll();
      isValidated.value = true;
    } catch (validationErrors) {
      errors.setAll(validationErrors as Record<string, string[]>);
      isValidated.value = false;
    } finally {
      isValidating.value = false;
    }

    return {
      valid: isValidated.value,
      fails: !isValidated.value,
      errors,
      isValidating,
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

  const  setTouched: SetTouched = (fields) => {
    Object.entries(fields).forEach(([field, isTouched]) => {
      if (field in touched) {
        touched[field] = isTouched;
      }
    });
  }

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
    isValidating,
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
