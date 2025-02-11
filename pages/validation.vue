<template>
  <div>
    <h1>Validation</h1>
    <pre>
      {{ errorDetails }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import {
  object,
  pipe,
  string,
  email,
  minLength,
  parse,
  ValiError,
  type InferOutput,
} from "valibot";

interface ErrorDetail {
  path: string;
  message: string;
}

const errorDetails = ref<ErrorDetail[]>([]);

const LoginSchema = object({
  email: pipe(
    string("L'email doit être une chaîne de caractères."),
    email("Veuillez fournir une adresse e-mail valide."),
  ),
  password: pipe(
    string("Le mot de passe doit être une chaîne de caractères."),
    minLength(1, "Le mot de passe doit pas etre vide."),
    minLength(8, "Le mot de passe doit contenir au moins 8 caractères."),
  ),
});

// Infer output TypeScript type of login schema
type LoginData = InferOutput<typeof LoginSchema>;

// Throws error for `email` and `password`
try {
  parse(LoginSchema, { email: "", password: "" });
} catch (error) {
  if (error instanceof ValiError) {
    errorDetails.value = error.issues.map((issue) => {
      console.info("path", issue.path, "message", issue.message);

      return {
        path: issue.path.map((p: { key: string }) => p.key).join("."),
        message: issue.message,
      };
    });

    console.info("error", errorDetails);
  }
}
</script>

<style></style>
