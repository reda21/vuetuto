<template>
  <h1 class="mb-4 flex items-center gap-0.5 text-2xl font-bold dark:text-white">Formulaire</h1>
  <p class="text-gray-700 dark:text-gray-300">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus quo optio a doloribus
    repudiandae voluptates asperiores, dicta beatae fugit totam quis maxime excepturi iste nostrum
    quasi non exercitationem accusantium facilis.
  </p>

  <form class="mx-auto mt-6 max-w-xl">
    <div class="mb-5">
      <UiFormLabel for="name" id="name">Nom</UiFormLabel>
      <UiFormInput id="name" v-model="form.name" placeholder="John Doe" size="small" />
    </div>
    <div class="mb-5 pt-4">
      <UiFormFloat/>
    </div>
    <div class="mb-5">
      <UiFormLabel for="email" id="email">Email</UiFormLabel>
      <UiFormInput type="email" id="email" v-model="form.email" placeholder="name@email.com" />
    </div>
    <div class="mb-5">
      <UiFormLabel for="password" id="password">Mots de passe</UiFormLabel>
      <UiFormInput v-model="form.password" id="password" type="password" />
    </div>
    <div class="mb-5">
      <UiFormLabel for="password_confirm" id="password_confirm"
        >Confirmer le Mots de passe</UiFormLabel
      >
      <UiFormInput v-model="form.password_confirm" id="password_confirm" type="password" />
    </div>
    <div class="mb-5 flex items-start">
      <div class="flex h-5 items-center">
        <input
          id="remember"
          type="checkbox"
          value=""
          class="h-4 w-4 rounded-sm border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
          required
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
  </form>
  <div class="mx-auto mt-4 max-w-xl text-gray-700 dark:text-gray-300">
    <pre>
    {{ form }}
  </pre
    >
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('clicked');
};

const isLoading = ref(false);
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirm: '',
});
</script>
