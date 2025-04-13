<template>
  <div>
    <h1 class="text-gray-900">Button {{ add }}</h1>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton label="Secondary" variant="outlined"/>
      <VButton variant="outlined" label="Primary" />
      <VSecondaryButton label="Secondary" />
      <VContrastButton label="Contrast" />
      <VDangerButton label="Danger" />
    </div>
    <div class="flex flex-wrap justify-center gap-4 mb-4">
      <VButton icon="pi pi-home" aria-label="Save" />
      <VButton label="Profile" icon="pi pi-user" />
      <VButton label="Save" icon="pi pi-check" iconPos="right" />
    </div>
    <div class="flex flex-wrap justify-center gap-4 mb-4">
      <VButton label="Search" icon="pi pi-search" iconPos="top" />
      <VButton label="Update" icon="pi pi-refresh" iconPos="bottom" />
    </div>
    <div class="card flex flex-wrap items-center justify-center gap-4">
        <VButton label="Small" icon="pi pi-check" size="small" />
        <VButton label="Normal" icon="pi pi-check" />
        <VButton label="Large" icon="pi pi-check" variant="outlined" size="large" />
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { twMerge } from 'tailwind-merge'

const add = twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
</script>

<style>
.alpha {
  color: var(--main-text-color);
}
</style>
