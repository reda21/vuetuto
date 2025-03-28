<template>
  <div class="card flex flex-wrap gap-2">
    <div class="card flex w-full justify-center">
      <AutoComplete
        fluid
        v-model="selectedItem"
        :suggestions="filteredItems"
        @complete="searchItems"
        :virtualScrollerOptions="{ itemSize: 38 }"
        optionLabel="label"
        dropdown
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AutoComplete from "primevue/autocomplete";
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";

interface Item {
	label: string;
	value: number;
}

const items = ref<Item[]>(
	Array.from({ length: 1000 }, (_, i) => ({ label: `Item #${i}`, value: i })),
);
const selectedItem = ref<Item | null>(null);
const filteredItems = ref<Item[]>([]);

const searchItems = (event: AutoCompleteCompleteEvent) => {
	const query = event.query;
	filteredItems.value = items.value.filter(
		(item) => item.label.toLowerCase().indexOf(query.toLowerCase()) === 0,
	);
};
</script>

<style></style>
