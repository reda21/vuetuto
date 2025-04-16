import { describe, it, expect, beforeEach } from 'vitest';
import { CustomError } from '../../utils/customError2';
import { ref } from 'vue';

interface Inputs {
  email: string;
  nom: string;
  prenom: string;
  username: string;
  age: number;
}

describe('CustomError', () => {
  let error: CustomError<Inputs>;

  beforeEach(() => {
    error = new CustomError<Inputs>();
  });

  it('setOne ajoute une erreur sous forme de tableau', () => {
    error.setOne('email', 'Invalide');
    expect(error.get('email')).toEqual(['Invalide']);
  });

  it('setOne ajoute une erreur sous forme de tableau si déjà tableau', () => {
    error.setOne('email', ['Invalide', 'Obligatoire']);
    expect(error.get('email')).toEqual(['Invalide', 'Obligatoire']);
  });

  it('set ajoute une chaîne à un tableau existant', () => {
    error.set('email', 'Invalide');
    error.set('email', 'Obligatoire');
    expect(error.get('email')).toEqual(['Invalide', 'Obligatoire']);
  });

  it('set ajoute un tableau directement', () => {
    error.set('email', ['Erreur1', 'Erreur2']);
    expect(error.get('email')).toEqual(['Erreur1', 'Erreur2']);
  });

  it('setAll remplace toutes les erreurs', () => {
    error.set('email', 'Invalide');
    error.setAll({ nom: 'Obligatoire', prenom: ['Court', 'Vide'] });
    expect(error.get('nom')).toEqual(['Obligatoire']);
    expect(error.get('prenom')).toEqual(['Court', 'Vide']);
    expect(error.has('email')).toBe(false);
  });

  it("get retourne undefined si la clé n'existe pas", () => {
    expect(error.get('nom')).toBeUndefined();
  });

  it('has retourne true si la clé existe', () => {
    error.set('nom', 'Erreur');
    expect(error.has('nom')).toBe(true);
  });

  it("has retourne false si la clé n'existe pas", () => {
    expect(error.has('username')).toBe(false);
  });

  it('all retourne toutes les erreurs', () => {
    error.set('nom', 'ErreurA');
    error.set('prenom', ['ErreurB1', 'ErreurB2']);
    expect(error.all()).toEqual({ nom: ['ErreurA'], prenom: ['ErreurB1', 'ErreurB2'] });
  });

  it('clear supprime une erreur', () => {
    error.set('email', 'Erreur');
    error.clear('email');
    expect(error.has('email')).toBe(false);
  });

  it('clearAll supprime toutes les erreurs', () => {
    error.set('nom', 'ErreurA');
    error.set('age', 'ErreurB');
    error.clearAll();
    expect(error.all()).toEqual({});
  });

  it('first retourne la première erreur du tableau', () => {
    error.set('email', ['Erreur1', 'Erreur2']);
    expect(error.first('email')).toBe('Erreur1');
  });

  it("first retourne null si la clé n'existe pas", () => {
    expect(error.first('email')).toBeNull();
  });
});
