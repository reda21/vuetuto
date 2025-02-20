import { UiTester } from '../.nuxt/components';
<template>
  <h1 class="flex gap-0.5 items-center text-2xl font-bold mb-4 dark:text-white">
    Formulaire
    <UiIcon icon="alarm-panel" inline rotation="right" />
  </h1>
  <div class="flex gap-1">
    <UiButton label="alpha" variant="danger" size="sm" />
    <UiButton label="clickez" variant="danger" />
    <UiButton label="clickez" variant="danger" size="lg" />
    <UiButton label="clickez" variant="danger" size="xl" />
    <UiButton label="clickez" variant="danger" size="2xl" disabled/>
  </div>
  <div class="flex gap-1 mt-3">
    <UiButton label="clickez" variant="primary" />
    <UiButton label="clickez" variant="success" disabled />
    <UiButton label="clickez" variant="light" disabled />
    <UiButton label="clickez" variant="dark" />
    <UiButton label="clickez" variant="link" disabled />
  </div>
  <div class="flex gap-1 mt-3">
    <UiButton variant="outline-primary" />
    <UiButton variant="outline-secondary" disabled />
    <UiButton variant="outline-success" disabled />
    <UiButton variant="outline-warning" />
    <UiButton variant="outline-danger" />
    <UiButton variant="outline-info" />
    <UiButton variant="outline-light" />
    <UiButton variant="outline-dark" />
  </div>
  <div class="flex gap-1 mt-3">
    <UiButton label="Profile" icon="home" lazy />
    <UiButton label="Save" icon="account-badge" iconPos="right" />
    <UiButton label="Search" icon="alarm-panel" iconPos="top" />
    <UiButton label="Update" icon="refresh" iconPos="bottom" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped></style>
