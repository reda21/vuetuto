// composables/useValidator.ts
import { ref, reactive, computed } from 'vue';
import { Validator } from '@chantouchsek/validatorjs';
import { CustomError } from '@/utils/customError';
import { MetaForm } from '@/utils/metaForm';
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
  const meta = new MetaForm(initialValues, values, rules);

  // const isValidated = ref(false);
  //const pending = ref(false);
  //const isSubmitting = ref(false);

  //const touched
  //const dirty

  Object.entries(initialErrors).forEach(([field, msg]) => errors.set(field, msg));

  setCustomRules();

  const validate = (): ValidationResult => {
    meta.setAllPending(true);

    runValidate(
      values,
      rules.getRules(),
      customMessages,
      () => {
        meta.setValidated(true);
      },
      (er) => {
        errors.setAll(er);
        meta.setValidated(false);
      }
    );
    meta.setAllPending(false);
    return {
      valid: meta.isvalidated,
      fails: ref(!meta.isvalidated),
      errors,
      pending: meta.isPending,
    };
  };

  const asyncValidateWitchField = (field: string) => {
    const fieldList = [field];
    const confirmation = rules.checkConfirmationField(field);

    if (confirmation) fieldList.push(confirmation);

    const same = rules.checkSameField(field);
    if (same) fieldList.push(same);

    errors.clearWith(fieldList);
    meta.setFieldPending(field, true);

    runAsyncValidate(
      values,
      rules.getRules(fieldList),
      customMessages,
      () => {
        meta.setValidated(true);
        meta.setFieldPending(field, false);
        fieldList.forEach((f) => {
          meta.setFieldDirty(f, true);
        });
      },
      (er) => {
        errors.setAll(er);
        meta.setValidated(false);
        meta.setFieldPending(field, false);
        fieldList.forEach((f) => {
          meta.setFieldDirty(f, true);
        });
      }
    );
  };

  const asyncValidate = async (): Promise<ValidationResult> => {
    meta.setAllPending(true);
    errors.clearAll();
    runAsyncValidate(
      values,
      rules.getRules(),
      customMessages,
      () => {
        meta.setValidated(true);
        meta.setAllPending(false);
        meta.setAllDirty(true);
      },
      (er) => {
        errors.setAll(er);
        meta.setValidated(false);
        meta.setAllPending(false);
        meta.setAllDirty(true);
      }
    );

    return {
      valid: meta.isvalidated,
      fails: ref(!meta.isvalidated),
      errors,
      pending: meta.isPending,
    };
  };

  const setFieldValue: SetFieldValue = (field, value) => {
    values[field] = value;
    meta.setFieldDirty(field, true);
    meta.setFieldTouched(field, true);
    //   validateForm();
  };

  const setValues: SetValues = (fields) => {
    Object.entries(fields).forEach(([field, value]) => {
      values[field] = value;
      meta.setFieldDirty(field, true);
      meta.setFieldTouched(field, true);
    });
    //   validateForm();
  };

  return {
    addCustomRule,
    addCustomAsyncRule,
    validate,
    asyncValidate,
    asyncValidateWitchField,
    setFieldValue,
    setValues,
    setFieldDirty: meta.setFieldDirty,
    setDirty: meta.setDirty,
    setAllDirty: meta.setAllDirty,
    setFieldTouched: meta.setFieldTouched,
    setTouched: meta.setTouched,
    setAllTouched: meta.setAllTouched,
    values,
    errors,
    meta,
    rules,
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
