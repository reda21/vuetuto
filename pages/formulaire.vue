<template>
  <h1 class="mb-4 flex items-center gap-0.5 text-2xl font-bold dark:text-white">
    Formulaire
    <UiIcon icon="alarm-panel" inline rotation="right" />
  </h1>
  <div class="flex gap-1">
    <UiButton label="alpha" variant="danger" size="sm" />
    <UiButton label="clickez" variant="danger" />
    <UiButton label="clickez" variant="danger" size="lg" />
    <UiButton label="clickez" variant="danger" size="xl" />
    <UiButton label="clickez" variant="danger" size="2xl" disabled />
  </div>
  <div class="mt-3 flex gap-1">
    <UiButton label="clickez" variant="primary" />
    <UiButton label="clickez" variant="success" disabled />
    <UiButton label="clickez" variant="light" disabled />
    <UiButton label="clickez" variant="dark" />
    <UiButton label="clickez" variant="link" disabled />
  </div>
  <div class="mt-3 flex gap-1">
    <UiButton variant="primary" />
    <UiButton variant="secondary" />
    <UiButton variant="success" />
    <UiButton variant="warning" />
    <UiButton variant="danger" />
    <UiButton variant="info" />
    <UiButton variant="light" disabled/>
    <UiButton variant="dark" disabled/>
  </div>
  <div class="mt-3 flex gap-1">
    <UiButton variant="outline-primary" disabled/>
    <UiButton variant="outline-secondary" disabled/>
    <UiButton variant="outline-success" disabled/>
    <UiButton variant="outline-warning" disabled/>
    <UiButton variant="outline-danger" disabled/>
    <UiButton variant="outline-info" disabled/>
    <UiButton variant="outline-light" disabled/>
    <UiButton variant="outline-dark" disabled/>
  </div>
  <div class="mt-3 flex gap-1">
    <UiButton label="Profile" icon="home" lazy />
    <UiButton label="Save" icon="account-badge" iconPos="right" />
    <UiButton label="Search" icon="alarm-panel" iconPos="top" />
    <UiButton label="Update" icon="refresh" iconPos="bottom" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
@reference "tailwindcss";

p {
  @apply text-emerald-300;
}
</style>
