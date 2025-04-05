import { beforeEach, describe, test, expect } from 'vitest';
import { Validator } from '@chantouchsek/validatorjs';

describe('Validation des données avec Validator.js', () => {
  let validator: Validator;

  beforeEach(() => {
    // Initialisation du validateur avec des données par défaut
    const données = {
      email: 'exemple@domaine.com',
      âge: 25,
    };

    const règles = {
      email: 'required|email',
      âge: 'required|integer|min:18',
    };

    validator = new Validator(données, règles);
  });

  test('Validation réussie avec des données correctes', () => {
    const validationRéussie = validator.passes();
    expect(validationRéussie).toBe(true);
  });

  test('Échec de la validation avec un email incorrect', () => {
    if (validator.input) {
        validator.input.email = 'adresse-email-invalide';
    }
    const validationRéussie = validator.passes();
    expect(validationRéussie).toBe(false);
    expect(validator.errors.first('email')).toBe('The email format is invalid.');
  });

  test('Échec de la validation avec un âge inférieur à 18', () => {
    if (validator.input) {
        validator.input.âge = 16;
    }
    const validationRéussie = validator.passes();
    expect(validationRéussie).toBe(false);
    expect(validator.errors.first('âge')).toBe('The âge must be at least 18.');
  });
});
