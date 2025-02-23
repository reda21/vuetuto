<template>
  <h1 class="mb-4 flex items-center gap-0.5 text-2xl font-bold dark:text-white">
    Formulaire
  </h1>
  <TestAlpha>
    <TestBeta />
  </TestAlpha>
  <div class="mb-3">
    <UiButtonGroup class="mb-3" aria-label="Basic example">
      <UiButton label="alpha" variant="danger" :rounded="rounded" />
      <UiButton label="alpha" variant="danger" :rounded="rounded" />
      <UiButton label="clickez" variant="danger" lazy :rounded="rounded" />
      <UiButton label="clickez" variant="danger" :rounded="rounded" />
      <UiButton label="clickez" variant="danger" :rounded="rounded" />
      <UiButton label="clickez" variant="danger" :rounded="rounded" />
    </UiButtonGroup>
  </div>
  <div class="mb-3 grid">
    <UiButton bsPrefix="toto" @click="handleClick" variant="primary" full />
  </div>
  <div class="mb-3">
    <UiButtonGroup class="mb-3" aria-label="Basic example" vertical>
      <UiButton label="clickez" variant="primary" size="xl" />
      <UiButton label="clickez" variant="success" />
      <UiButton label="clickez" variant="light" size="xs" />
      <UiButton label="clickez" variant="dark" />
      <UiButton label="clickez" variant="link" />
    </UiButtonGroup>
  </div>
  <div class="mb-3">
    <UiButtonGroup class="mb-3" aria-label="Basic example" vertical>
      <button type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
      <button type="button"
        class="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
      <button type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>
      <button type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>
      <button type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
      <button type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
      <button type="button"
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-yellow-900">Yellow</button>
      <button type="button"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
    </UiButtonGroup>
  </div>
  <div class="mt-3 mb-3 flex gap-3">
    <UiButton bsPrefix="btr" variant="primary" />
    <UiButton variant="gradient-primary" />
    <UiButton variant="secondary" />
    <UiButton variant="success" />
    <UiButton variant="warning" />
    <UiButton variant="danger" />
    <UiButton variant="info" />
    <UiButton variant="light" disabled />
    <UiButton variant="dark" disabled />
  </div>
  <div class="mt-3 mb-3 flex gap-3">
    <UiButton variant="outline-primary" disabled />
    <UiButton variant="outline-secondary" disabled />
    <UiButton variant="outline-success" disabled />
    <UiButton variant="outline-warning" disabled />
    <UiButton variant="outline-danger" disabled />
    <UiButton variant="outline-info" disabled />
    <UiButton variant="outline-light" disabled />
    <UiButton variant="outline-dark" disabled />
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log("clicked");
};

type RoundedType = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const rounded: RoundedType = "lg";
</script>
