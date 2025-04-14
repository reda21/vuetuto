<template>
  <div>
    <h1 class="mb-4 text-gray-900">Button {{ add }}</h1>
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
      <UiButton variant="subtle" label="primary"  />
      <UiButton variant="subtle" label="info" severity="info"  />
      <UiButton variant="subtle" label="Secondary" severity="secondary"  />
      <UiButton variant="subtle" label="Success" severity="success"  />
      <UiButton variant="subtle" label="Warn" severity="warn"  />
      <UiButton variant="subtle" label="Help" severity="help"  />
      <UiButton variant="subtle" label="Danger" severity="danger"  />
      <UiButton variant="subtle" label="Contrast" severity="contrast"  />
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
