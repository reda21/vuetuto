<template>
  <div>
    <Button @click="showProducts" label="open" />
    <DynamicDialog />
  </div>
</template>

<script lang="ts" setup>
import { useDialog } from "primevue/usedialog";
import ProductListDemo from "@/components/ProductListDemo.vue";

interface CancelEventPayload {
  user: string; // Définition du type de charge utile émise lors de l'annulation
}

const dialog = useDialog();
const showProducts = (): void => {
  dialog.open(ProductListDemo, {
    props: {
      header: "Product List alpha",
      style: {
        width: "50vw",
      },
      breakpoints: {
        "960px": "75vw",
        "640px": "90vw",
      },
      modal: true,
    },
    onCancel: (e: CancelEventPayload) => {
      console.log(e); // Affiche la charge utile émise par le composant enfant
    },
  });
};
</script>

<style></style>
