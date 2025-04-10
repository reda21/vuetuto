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
} from '@/components/ui/form/formType';

export const useValidator: UseValidator = ({ initialValues = {}, schema = {}, customMessages = {} }) => {
  //init
  // on initialise values avec initialValues
  const values = reactive<Record<string, any>>(initialValues);
  const errors = new CustomError();
  const rules = new ValidationRulesManager(schema);

  const isValidated = ref(false);
  const isValidating = ref(false);
  const meta: ComputedRef<Partial<FormMeta>> = computed(() => ({
    pending: isValidating.value,
    valid: isValidated.value,
  }));

  setCustomRules();

  const validate = async (): Promise<ValidationResult> => {
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

  return { addCustomRule, addCustomAsyncRule, validate, values, errors, meta, rules };
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


