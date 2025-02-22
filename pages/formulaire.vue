<template>
  <h1 class="mb-4 flex items-center gap-0.5 text-2xl font-bold dark:text-white">
    Formulaire
  </h1>
  <ButtonGroup class="grid mb-3" aria-label="Basic example">
    <UiButton label="alpha" variant="danger" size="xs" />
    <UiButton label="alpha" variant="danger" size="sm" />
    <UiButton label="clickez" variant="danger" lazy />
    <UiButton label="clickez" variant="danger" size="lg" />
    <UiButton label="clickez" variant="danger" size="xl" />
    <UiButton label="clickez" variant="danger" size="2xl" />
  </ButtonGroup>
  
  <div class="grid mb-3">
    <UiButton bsPrefix="toto" @click="handleClick" variant="primary" full/>
  </div>
    
  <div class="mt-3 flex gap-3 mb-3">
    <UiButton label="clickez" variant="primary" />
    <UiButton label="clickez" variant="success" disabled />
    <UiButton label="clickez" variant="light" disabled />
    <UiButton label="clickez" variant="dark" />
    <UiButton label="clickez" variant="link" disabled />
  </div>
  <div class="mt-3 flex gap-3 mb-3">
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
  <div class="mt-3 flex gap-3 mb-3">
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
  console.log('clicked')
}

</script>

<style lang="css" scoped>
@reference "tailwindcss";

p {
  @apply text-emerald-300;
}
</style>
