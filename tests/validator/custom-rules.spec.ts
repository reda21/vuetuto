//tests\validator\custom-rules.spec.ts
import { describe, it, expect } from 'vitest';
import { Validator } from '@chantouchsek/validatorjs';
import { useValidator } from '../../composables/useValidator';

const { validate, addCustomRule } = useValidator();

// Enregistrer une règle de validation personnalisée
addCustomRule(
  'uppercase',
  (value: any) => typeof value === 'string' && value === value.toUpperCase(),
  'Le champ :attribute doit être en majuscules.'
);

describe('Règles de validation personnalisées', () => {
  it('devrait valider que la valeur est en majuscules', () => {
    const data = { name: 'JOHN' };
    const rules = { name: 'uppercase' };

    const { passes, fails } = validate(data, rules);
    expect(passes()).toBe(true);
    expect(fails()).toBe(false);
  });

  it("devrait échouer si la valeur n'est pas en majuscules", () => {
    const data = { name: 'John' };
    const rules = { name: 'uppercase' };
    const { passes, fails, errors } = validate(data, rules);

    expect(passes()).toBe(false);
    expect(fails()).toBe(true);
    expect(errors.first('name')).toBe('Le champ name doit être en majuscules.');
  });
});
