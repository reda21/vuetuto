// composables/useValidator.ts
import { Validator } from '@chantouchsek/validatorjs';

export const useValidator = () => {
  const isValidating = ref(false);

  // Fonction pour ajouter une règle de validation personnalisée
  const addCustomRule = (
    ruleName: string,
    callback: (value: any) => boolean,
    errorMessage: string
  ) => {
    Validator.register(ruleName, callback, errorMessage);
  };

  const addCustomAsyncRule = (
    ruleName: string,
    callback: (input: string, value: string, attribute: string, passes: any) => void,
    errorMessage: string
  ) => {
    Validator.registerAsync(ruleName, callback, errorMessage);
  };

  // Fonction pour valider les données avec les règles spécifiées
  const validate = (data: any, rules: any, customMessages: Record<string, any> = {}) => {
    const validation = new Validator(data, rules, customMessages);

    return {
      // On renvoie des fonctions qui appellent validation.passes()/fails()
      passes: () => validation.passes(),
      fails: () => validation.fails(),
      errors: validation.errors,
    };
  };

  // Si vous avez d'autres règles à initialiser, faites-le ici
  const setCustomsRules = () => {
    // ex. addCustomRule('uppercase', ...);
    // Règle asynchrone pour vérifier la disponibilité du nom d’utilisateur
    addCustomAsyncRule(
      'username_available',
      (
        username: string,
        attribute: string,
        req: any,
        passes: (success?: boolean, message?: string) => void
      ) => {
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
  setCustomsRules();

  return {
    addCustomRule,
    addCustomAsyncRule,
    validate,
  };
};
