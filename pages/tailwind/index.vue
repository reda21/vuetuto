<template>
  <div>
    <h1 class="mb-2 text-3xl font-bold text-gray-700 underline dark:text-gray-300">
      tailwind main page
    </h1>
    <div class="card flex justify-center">
      <AutoComplete
        v-model="selectedCountry"
        optionLabel="name"
        :suggestions="filteredCountries"
        @complete="search"
      />
    </div>
    <div class="card flex justify-center">
      <Drawer v-model:visible="visible" header="Bottom Drawer" position="full" style="height: auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Drawer>
      <Button icon="pi pi-arrow-left" @click="visible = true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import AutoComplete from 'primevue/autocomplete';
import { CountryService } from '~~/utils/contries';
import Drawer from 'primevue/drawer';

const visible = ref(false);

onMounted(() => {
  CountryService.getCountries().then((data) => (countries.value = data));
});

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface Country {
  name: string;
  code: string;
}

const countries = ref<Country[]>([]);
const selectedCountry = ref<Country | null>(null);
const filteredCountries = ref<Country[]>([]);

const search = (event: AutoCompleteEvent) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCountries.value = [...countries.value];
    } else {
      filteredCountries.value = countries.value.filter((country: Country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};
</script>

<style></style>
