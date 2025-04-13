//tests\validator\custom-rules.spec.ts
import { describe, it, expect } from 'vitest';
import { Validator } from '@chantouchsek/validatorjs';
import { useValidator } from '../../composables/useValidator';

const rules = { name: 'uppercase' };
const { validate, addCustomRule, values } = useValidator({
  initialValues: {
    name: '',
  },
  schema: rules,
});
// Enregistrer une règle de validation personnalisée
addCustomRule(
  'uppercase',
  (value: any) => typeof value === 'string' && value === value.toUpperCase(),
  'Le champ :attribute doit être en majuscules.'
);

describe('Règles de validation personnalisées', () => {
  it('devrait valider que la valeur est en majuscules', async () => {
    values.name = 'JOHN';

    const { valid, fails } = await validate();
    expect(valid).toBe(true);
    expect(fails).toBe(false);
  });

  it("devrait échouer si la valeur n'est pas en majuscules", async () => {
    values.name = 'John';
    const { valid, fails, errors } = await validate();

    expect(valid).toBe(false);
    expect(fails).toBe(true);
    expect(errors.first('name')).toBe('Le champ name doit être en majuscules.');
  });
});
