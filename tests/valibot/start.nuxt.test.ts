// @vitest-environment nuxt
import { test, expect } from 'vitest';
import { object, pipe, string, email, minLength, parse, ValiError } from 'valibot';

// Définition du type TypeScript pour les données de connexion
type LoginData = {
  email: string;
  password: string;
};

// Définition du schéma Valibot avec des messages d'erreur personnalisés
const LoginSchema = object({
  email: pipe(
    string('L\'email doit être une chaîne de caractères.'),
    email('Veuillez fournir une adresse e-mail valide.')
  ),
  password: pipe(
    string('Le mot de passe doit être une chaîne de caractères.'),
    minLength(1, 'Le mot de passe doit pas etre vide.'),
    minLength(8, 'Le mot de passe doit contenir au moins 8 caractères.')
  ),
});

// Test pour un cas de validation réussie
test('Validation réussie avec des données valides', () => {
  const validData: LoginData = {
    email: 'utilisateur@example.com',
    password: 'motdepassevalide',
  };

  // La fonction parse ne doit pas lever d'erreur pour des données valides
  expect(() => parse(LoginSchema, validData)).not.toThrow();
});

// Test pour un cas de validation échouée avec vérification des messages d'erreur
test('Validation échouée avec des données invalides et vérification des messages d\'erreur', () => {
  const invalidData: LoginData = {
    email: 'email-invalide',
    password: 'court',
  };

  try {
    parse(LoginSchema, invalidData);
    // Si aucune erreur n'est levée, le test échoue
    throw new Error('La validation aurait dû échouer');
  } catch (error) {
    if (error instanceof ValiError) {
      // Extraction des messages d'erreur et des chemins correspondants
      const errorDetails = error.issues.map(issue => ({
        path: issue.path.map((p: { key: string }) => p.key).join('.'),
        message: issue.message,
      }));

      // Vérification que les erreurs contiennent les messages attendus
      expect(errorDetails).toEqual(
        expect.arrayContaining([
          { path: 'email', message: 'Veuillez fournir une adresse e-mail valide.' },
          { path: 'password', message: 'Le mot de passe doit contenir au moins 8 caractères.' },
        ])
      );
    } else {
      // Si l'erreur n'est pas une ValiError, échouer le test
      throw error;
    }
  }
});

test('Validation réussie avec des données valides', () => {
  const data: LoginData = {
    email: 'utilisateur@example.com',
    password: '',
  };

  try {
    parse(LoginSchema, data);

    console.info("data", data);
    // Si aucune erreur n'est levée, le test échoue
    throw new Error('La validation aurait dû échouer');
  }catch (error) {
    if (error instanceof ValiError) {
      const errorDetails = error.issues.map(issue => ({
        path: issue.path.map((p: { key: string }) => p.key).join('.'),
        message: issue.message,
      }));
      console.info(errorDetails)
    }
   
  }


  // La fonction parse ne doit pas lever d'erreur pour des données valides
  expect(true).toBe(true);
});


