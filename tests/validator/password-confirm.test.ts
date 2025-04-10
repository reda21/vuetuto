// password-confirm.test.js
import { Validator, type ValidatorOptions } from '@chantouchsek/validatorjs';
import { describe, it, expect } from 'vitest';

describe('Validation de confirmation de mot de passe', () => {
  const rules = {
    password: 'required|confirmed',
  };
  const messages = {
    'password.confirmed': 'Les mots de passe ne correspondent pas.',
  };

  it('passe si password et password_confirmation sont identiques', () => {
    const data = {
      password: 'MonSecret123!',
      password_confirmation: 'MonSecret123!',
    };
    const validation = new Validator(data, rules, { customMessages: messages });
    expect(validation.passes()).toBe(true);
    expect(validation.fails()).toBe(false);
  });

  it('échoue si password et password_confirmation diffèrent', () => {
    const data = {
      password: 'MonSecret123!',
      password_confirmation: 'AutreMotDePasse',
    };
    const validation = new Validator(data, rules, { customMessages: messages });
    expect(validation.fails()).toBe(true);
    // récupère le premier message d’erreur pour le champ "password"
    expect(validation.errors.first('password')).toBe('The password does not match.');
  });
});
