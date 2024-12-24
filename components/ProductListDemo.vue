<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-4">Liste des produits</h2>
    <ul class="list-none">
      <li
        v-for="product in products"
        :key="product.id"
        class="p-2 border-b border-gray-300"
      >
        <span class="font-bold">{{ product.name }}</span> - {{ product.price }}$
      </li>
    </ul>
    <div class="mt-4 text-right">
      <Button 
        label="Annuler" 
        class="p-button-danger" 
        @click="handleCancel" 
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Définir les props
defineProps({
  // Aucune prop requise dans cet exemple, mais elles peuvent être ajoutées si nécessaire.
});

// Événement à émettre pour l'annulation
const emit = defineEmits<{
  (e: 'cancel', payload: { user: string }): void;
}>();

// Liste des produits (exemple de données statiques)
const products = [
  { id: 1, name: 'Produit 1', price: 100 },
  { id: 2, name: 'Produit 2', price: 200 },
  { id: 3, name: 'Produit 3', price: 300 },
  { id: 4, name: 'Produit 4', price: 400 },
  { id: 5, name: 'Produit 5', price: 500 },
];

// Méthode pour gérer le clic sur "Annuler"
const handleCancel = () => {
  emit('cancel', { user: 'primetime' });
};
</script>

<style scoped>
/* Vous pouvez ajouter des styles spécifiques ici */
</style>
