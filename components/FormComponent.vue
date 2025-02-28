<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="mx-auto mt-8 flex w-full flex-col gap-4 sm:w-3xl"
  >
    <div class="mb-5">
      <UiFormLabel for="username" id="name">username</UiFormLabel>
      <UiFormInput
        id="username"
        v-model="initialValues.username"
        placeholder="john.doe"
        size="small"
      />
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
        $form.username.error?.message
      }}</Message>
    </div>
    <div class="mb-5">
      <UiFormLabel for="name" id="name">Nom</UiFormLabel>
      <UiFormInput id="name" v-model="initialValues.name" placeholder="John Doe" />
    </div>
    <div class="mb-5">
      <UiFormLabel for="contry" id="name">Nation</UiFormLabel>
      <UiFormAutocomplete id="contry" v-model="initialValues.contry" placeholder="Pays" />
    </div>
    <div class="mb-5 pt-4">
      <UiFormFloat />
    </div>
    <div class="mb-5">
      <UiFormLabel for="email" id="email">Email</UiFormLabel>
      <UiFormInput
        type="email"
        id="email"
        v-model="initialValues.email"
        placeholder="name@email.com"
      />
    </div>
    <div class="mb-5">
      <UiFormLabel for="password" id="password">Mots de passe</UiFormLabel>
      <UiFormInput v-model="initialValues.password" id="password" type="password" />
    </div>
    <div class="mb-5">
      <UiFormLabel for="password_confirm" id="password_confirm"
        >Confirmer le Mots de passe</UiFormLabel
      >
      <UiFormInput v-model="initialValues.password_confirm" id="password_confirm" type="password" />
    </div>
    <div class="mb-5 flex items-start">
      <div class="flex h-5 items-center">
        <input
          id="remember"
          type="checkbox"
          value=""
          class="h-4 w-4 rounded-sm border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
        />
      </div>
      <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Remember me</label
      >
    </div>
    <button
      type="submit"
      class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </Form>
  <div class="mx-auto mt-4 max-w-xl text-gray-700 dark:text-gray-300">
    <pre>
    {{ initialValues }}
  </pre
    >
  </div>
</template>

<script setup lang="ts">
import { UiFormAutocomplete } from '#components';
import { Form } from '@primevue/forms';
import type { FormResolverOptions, FormSubmitEvent } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

interface FormValues {
  username?: string;
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  contry: string;
}

const onFormSubmit = ({ valid }: FormSubmitEvent) => {
  console.log('Form is submitted', valid);
  if (valid) {
    console.log('Form is valid');
    /* toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000
    }); */
  }
};

const resolver = (options: FormResolverOptions) => {
  const values = options.values as FormValues;
  const errors: Record<string, any> = {};

  if (!values.username) {
    errors.username = [{ message: 'Username is required.' }];
  }
  console.info('Resolver', options);
  return { values, errors };
};

const initialValues = reactive<FormValues>({
  username: 'hello',
  name: '',
  email: '',
  password: '',
  password_confirm: '',
  contry: '',
});

/**
 onMounted(() => {
  CountryService.getCountries().then((data) => (countries.value = data));
});

const countries = ref();
const selectedCountry = ref();
const filteredCountries = ref();

const search = (event: AutoCompleteCompleteEvent) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCountries.value = [...countries.value];
    } else {
      filteredCountries.value = countries.value.filter((country: { name: string }) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};
 */
</script>
