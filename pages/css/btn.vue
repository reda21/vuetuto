d
<template>
  <h1>tailwindcss BTN</h1>
  <div class="flex gap-2 mt-3">
    <div>
      <Button :loading="isLoading" icon="pi pi-home" aria-label="Save" />
      <Button :loading="isLoading" severity="contrast" label="Profile" icon="pi pi-user" />
      <Button :loading="isLoading" severity="info" label="Save" icon="pi pi-check" iconPos="right" />
      <Button :loading="isLoading" severity="warn" label="Search" icon="pi pi-search" iconPos="right" />
      <Button :loading="isLoading" severity="help" label="Update" icon="pi pi-refresh" iconPos="left" />
    </div>ButtonGroup>
  </div>
  <div class="flex gap-2 mt-3">
    <ButtonGroup>
      <Button :loading="isLoading" label="Primary" raised />
      <Button :loading="isLoading" label="Secondary" severity="secondary" raised />
      <Button :loading="isLoading" label="Success" severity="success" raised />
      <Button :loading="isLoading" label="Info" severity="info" raised />
      <Button :loading="isLoading" label="Warn" severity="warn" raised />
      <Button :loading="isLoading" label="Help" severity="help" raised />
      <Button :loading="isLoading" label="Danger" severity="danger" raised />
      <Button :loading="isLoading" label="Contrast" severity="contrast" raised />
    </ButtonGroup>
  </div>
  <div class="flex gap-2 mt-3">
    <Button :loading="isLoading" label="Primary" variant="text" />
    <Button :loading="isLoading" label="Secondary" severity="secondary" variant="text" />
    <Button :loading="isLoading" label="Success" severity="success" variant="text" />
    <Button :loading="isLoading" label="Info" severity="info" variant="text" />
    <Button :loading="isLoading" label="Warn" severity="warn" variant="text" />
    <Button :loading="isLoading" label="Help" severity="help" variant="text" />
    <Button :loading="isLoading" label="Danger" severity="danger" variant="text" />
    <Button :loading="isLoading" label="Contrast" severity="contrast" variant="text" />
    <Button :loading="isLoading" label="Personnalisé"
      :style="{ backgroundColor: '#ff5733', borderColor: '#ff5733', color: '#ffffff' }" class="my-custom-button" />
    <Button label="Suivre sur Twitter" icon="pi pi-twitter"
      class="bg-twitter border-twitter text-white hover:text-twitter hover:bg-white hover:border-twitter focus:outline-none font-semibold px-4 py-2 shadow-lg transition-all duration-200" />



  </div>
  <div class="flex gap-2 mt-3">
    <Button label="Primary" variant="text" raised />
    <Button label="Secondary" severity="secondary" variant="text" raised />
    <Button label="Success" severity="success" variant="text" raised />
    <Button label="Info" severity="info" variant="text" raised />
    <Button label="Warn" severity="warn" variant="text" raised />
    <Button label="Help" severity="help" variant="text" raised />
    <Button label="Danger" severity="danger" variant="text" raised />
    <Button label="Contrast" severity="contrast" variant="text" raised />
  </div>
  <div class="flex gap-2 mt-3">
    <Button label="Primary" variant="outlined" />
    <Button label="Secondary" severity="secondary" variant="outlined" />
    <Button label="Success" severity="success" variant="outlined" />
    <Button label="Info" severity="info" variant="outlined" />
    <Button label="Warn" severity="warn" variant="outlined" />
    <Button label="Help" severity="help" variant="outlined" />
    <Button label="Danger" severity="danger" variant="outlined" />
    <Button label="Contrast" severity="contrast" variant="outlined" />
  </div>
  <div class="flex gap-2 mt-3">
    <Button label="Primary" variant="outlined" />
    <Button label="Secondary" severity="secondary" variant="outlined" />
    <Button label="Success" severity="success" variant="outlined" />
    <Button label="Info" severity="info" variant="outlined" />
    <Button label="Warn" severity="warn" variant="outlined" />
    <Button label="Help" severity="help" variant="outlined" />
    <Button label="Danger" severity="danger" variant="outlined" />
    <Button label="Contrast" severity="contrast" variant="outlined" />
  </div>
  <div class="flex gap-2 mt-3">
    <Button icon="pi pi-check" aria-label="Filter" />
    <Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
    <Button icon="pi pi-search" severity="success" aria-label="Search" />
    <Button icon="pi pi-user" severity="info" aria-label="User" />
    <Button icon="pi pi-bell" severity="warn" aria-label="Notification" />
    <Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
    <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
    <Button icon="pi pi-star" severity="contrast" aria-label="Star" />
  </div>
  <div class="flex gap-2 mt-3">
    <Button icon="pi pi-check" rounded aria-label="Filter" />
    <Button icon="pi pi-bookmark" severity="secondary" rounded aria-label="Bookmark" />
    <Button icon="pi pi-search" severity="success" rounded aria-label="Search" />
    <Button icon="pi pi-user" severity="info" rounded aria-label="User" />
    <Button icon="pi pi-bell" severity="warn" rounded aria-label="Notification" />
    <Button icon="pi pi-heart" severity="help" rounded aria-label="Favorite" />
    <Button icon="pi pi-times" severity="danger" rounded aria-label="Cancel" />
    <Button icon="pi pi-star" severity="contrast" rounded aria-label="Star" />
  </div>
  <div class="flex gap-2 mt-3">
    <Button icon="pi pi-check" rounded variant="outlined" aria-label="Filter" />
    <Button icon="pi pi-bookmark" severity="secondary" rounded variant="outlined" aria-label="Bookmark" />
    <Button icon="pi pi-search" severity="success" rounded variant="outlined" aria-label="Search" />
    <Button icon="pi pi-user" severity="info" rounded variant="outlined" aria-label="User" />
    <Button icon="pi pi-bell" severity="warn" rounded variant="outlined" aria-label="Notification" />
    <Button icon="pi pi-heart" severity="help" rounded variant="outlined" aria-label="Favorite" />
    <Button icon="pi pi-times" severity="danger" rounded variant="outlined" aria-label="Cancel" />
    <Button icon="pi pi-star" severity="contrast" rounded variant="outlined" aria-label="Star" />
  </div>
  <div class="flex gap-2 mt-3">
    <Button icon="pi pi-check" variant="text" raised rounded aria-label="Filter" />
    <Button icon="pi pi-bookmark" severity="secondary" variant="text" raised rounded aria-label="Bookmark" />
    <Button icon="pi pi-search" severity="success" variant="text" raised rounded aria-label="Search" />
    <Button icon="pi pi-user" severity="info" variant="text" raised rounded aria-label="User" />
    <Button icon="pi pi-bell" severity="warn" variant="text" raised rounded aria-label="Notification" />
    <Button icon="pi pi-heart" severity="help" variant="text" raised rounded aria-label="Favorite" />
    <Button icon="pi pi-times" severity="danger" variant="text" raised rounded aria-label="Cancel" />
    <Button icon="pi pi-star" severity="contrast" variant="text" raised rounded aria-label="Star" />
  </div>
  <div class="flex gap-2 mt-3">
    <Button icon="pi pi-check" variant="text" rounded aria-label="Filter" />
    <Button icon="pi pi-bookmark" severity="secondary" variant="text" rounded aria-label="Bookmark" />
    <Button icon="pi pi-search" severity="success" variant="text" rounded aria-label="Search" />
    <Button icon="pi pi-user" severity="info" variant="text" rounded aria-label="User" />
    <Button icon="pi pi-bell" severity="warn" variant="text" rounded aria-label="Notification" />
    <Button icon="pi pi-heart" severity="help" variant="text" rounded aria-label="Favorite" />
    <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" />
    <Button icon="pi pi-star" severity="contrast" variant="text" rounded aria-label="Star" />
  </div>
  <div class="flex gap-2 mt-3">
    <Button icon="pi pi-check" aria-label="Submit" />

    <Button :loading="isLoading" @click="change" icon="pi pi-check" label="Submit" />

    <Button class="youtube p-0" aria-label="Youtube">
      <i class="pi pi-youtube px-2"></i>
      <span class="px-4">Youtube</span>
    </Button>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(false);

const change = () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}

//import Button from "primevue/button";
</script>
