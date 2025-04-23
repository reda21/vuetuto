<template>
  <div>
    <h1 class="mb-4 text-gray-900">Button {{ add }}</h1>
    <div class="card mb-4 flex flex-col items-center gap-4">
      <div class="flex flex-wrap justify-center gap-4">
        <UiButton icon="pi pi-home" aria-label="Save" />
        <UiButton label="Profile" icon="pi pi-user" />
        <UiButton label="Save" icon="pi pi-check" iconPos="right" />
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <UiButton label="Search" icon="pi pi-search" iconPos="top" />
        <UiButton label="Update" icon="pi pi-refresh" iconPos="bottom" />
      </div>
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton label="primary" />
      <UiButton label="info" severity="info" />
      <UiButton label="Secondary" severity="secondary" />
      <UiButton label="Success" severity="success" />
      <UiButton label="Warn" severity="warn" />
      <UiButton label="Help" severity="help" />
      <UiButton label="Danger" severity="danger" />
      <UiButton label="Contrast" severity="contrast" />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton label="raised" raised />
      <UiButton label="info" severity="info" raised />
      <UiButton label="Secondary" severity="secondary" raised />
      <UiButton label="Success" severity="success" raised />
      <UiButton label="Warn" severity="warn" raised />
      <UiButton label="Help" severity="help" raised />
      <UiButton label="Danger" severity="danger" raised />
      <UiButton label="Contrast" severity="contrast" raised />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton label="rounded" rounded="xs" />
      <UiButton label="info" severity="info" rounded="sm" />
      <UiButton label="Secondary" severity="secondary" rounded="md" />
      <UiButton label="Success" severity="success" rounded="lg" />
      <UiButton label="Warn" severity="warn" rounded="lg" />
      <UiButton label="Help" severity="help" rounded="xl" />
      <UiButton label="Danger" severity="danger" rounded="2xl" />
      <UiButton label="Contrast" severity="contrast" rounded="full" />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton label="primary" disabled />
      <UiButton label="info" severity="info" disabled />
      <UiButton label="Secondary" severity="secondary" disabled />
      <UiButton label="Success" severity="success" disabled />
      <UiButton label="Warn" severity="warn" disabled />
      <UiButton label="Help" severity="help" disabled />
      <UiButton label="Danger" severity="danger" disabled />
      <UiButton label="Contrast" severity="contrast" disabled />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton variant="outlined" label="primary" />
      <UiButton variant="outlined" label="info" severity="info" />
      <UiButton variant="outlined" label="Secondary" severity="secondary" />
      <UiButton variant="outlined" label="Success" severity="success" />
      <UiButton variant="outlined" label="Warn" severity="warn" />
      <UiButton variant="outlined" label="Help" severity="help" />
      <UiButton variant="outlined" label="Danger" severity="danger" />
      <UiButton variant="outlined" label="Contrast" severity="contrast" />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4" disabled>
      <UiButton variant="outlined" label="primary" disabled />
      <UiButton variant="outlined" label="info" severity="info" disabled />
      <UiButton variant="outlined" label="Secondary" severity="secondary" disabled />
      <UiButton variant="outlined" label="Success" severity="success" disabled />
      <UiButton variant="outlined" label="Warn" severity="warn" disabled />
      <UiButton variant="outlined" label="Help" severity="help" disabled />
      <UiButton variant="outlined" label="Danger" severity="danger" disabled />
      <UiButton variant="outlined" label="Contrast" severity="contrast" disabled />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton variant="soft" label="primary" />
      <UiButton variant="soft" label="info" severity="info" />
      <UiButton variant="soft" label="Secondary" severity="secondary" />
      <UiButton variant="soft" label="Success" severity="success" />
      <UiButton variant="soft" label="Warn" severity="warn" />
      <UiButton variant="soft" label="Help" severity="help" />
      <UiButton variant="soft" label="Danger" severity="danger" />
      <UiButton variant="soft" label="Contrast" severity="contrast" />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton variant="soft" label="primary" disabled />
      <UiButton variant="soft" label="info" severity="info" disabled />
      <UiButton variant="soft" label="Secondary" severity="secondary" disabled />
      <UiButton variant="soft" label="Success" severity="success" disabled />
      <UiButton variant="soft" label="Warn" severity="warn" disabled />
      <UiButton variant="soft" label="Help" severity="help" disabled />
      <UiButton variant="soft" label="Danger" severity="danger" disabled />
      <UiButton variant="soft" label="Contrast" severity="contrast" disabled />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton variant="subtle" label="primary" />
      <UiButton variant="subtle" label="info" severity="info" />
      <UiButton variant="subtle" label="Secondary" severity="secondary" />
      <UiButton variant="subtle" label="Success" severity="success" />
      <UiButton variant="subtle" label="Warn" severity="warn" />
      <UiButton variant="subtle" label="Help" severity="help" />
      <UiButton variant="subtle" label="Danger" severity="danger" />
      <UiButton variant="subtle" label="Contrast" severity="contrast" />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton variant="ghost" label="primary" />
      <UiButton variant="ghost" label="info" severity="info" />
      <UiButton variant="ghost" label="Secondary" severity="secondary" />
      <UiButton variant="ghost" label="Success" severity="success" />
      <UiButton variant="ghost" label="Warn" severity="warn" />
      <UiButton variant="ghost" label="Help" severity="help" />
      <UiButton variant="ghost" label="Danger" severity="danger" />
      <UiButton variant="ghost" label="Contrast" severity="contrast" />
    </div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton variant="link" label="primary" />
      <UiButton variant="link" label="info" severity="info" />
      <UiButton variant="link" label="Secondary" severity="secondary" />
      <UiButton variant="link" label="Success" severity="success" />
      <UiButton variant="link" label="Warn" severity="warn" />
      <UiButton variant="link" label="Help" severity="help" />
      <UiButton variant="link" label="Danger" severity="danger" />
      <UiButton variant="link" label="Contrast" severity="contrast" />
    </div>
    <div class="card mb-4 flex flex-wrap items-center justify-center gap-4">
      <UiButton label="primary" />
      <UiButton label="primary" size="xs" />
      <UiButton label="primary" size="sm" />
      <UiButton label="primary" size="md" />
      <UiButton label="primary" size="lg" />
      <UiButton label="primary" size="xl" />
      <UiButton label="primary" size="2xl" />
    </div>
    <div class="card mb-4 flex flex-wrap items-center justify-center gap-4">
      <vButtonGroup>
        <UiButton label="Save" icon="pi pi-check" />
        <UiButton severity="danger" label="Delete" icon="pi pi-trash" />
        <UiButton label="Cancel" icon="pi pi-times" />
      </vButtonGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { twMerge } from 'tailwind-merge';

definePageMeta({
  layout: 'default', // correspond au fichier layouts/blog.vue
});

const add = twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]');
</script>

<style>
.alpha {
  color: var(--main-text-color);
}
</style>
