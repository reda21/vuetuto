import { describe, expect, it } from 'vitest';
import { Validator } from '@chantouchsek/validatorjs';

const { validate, addCustomAsyncRule } = useValidator();

addCustomAsyncRule(
  'username',
  (input: string, value: string, attribute: string, passes: any) => {
    setTimeout(() => {
      if (input === 'admin') passes(false, 'This username is banned');
    }, 50);
  },
  ':attribute is an invalid username'
);

describe('async rule tests', () => {
  it('should allow custom error message', () =>
    new Promise<void>((resolve) => {
      const validator = new Validator({ username: 'admin' }, { username: 'username' });
      validator.fails(() => {
        expect(validator.errors.first('username')).toEqual('This username is banned');
        resolve();
      });
    }));
});
