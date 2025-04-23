import { Variant } from '../../types/ui/button';
<template>
  <div>
    <div class="card mb-4 flex flex-wrap justify-center gap-4">
      <UiButton variant="outlined" severity="info" label="primary" raised />
      <UiButton lazy icon="pi pi-home" aria-label="Save" />
      <VButton type="button" label="Emails" badge="2" variant="outlined" />
      <VButton icon="pi pi-home" aria-label="Save" />
      <VButton size="small" label="primary" raised />
      <VButton label="reaction">Action</VButton>
      <UiButton :badge="4" aria-label="Save" rounded="lg">Save</UiButton>
    </div>
  </div>
</template>
