<template>
  <AutoComplete v-model="selectedCountry" loading disabled class="w-full" dropdown placeholder="selection le pays" optionLabel="name" :suggestions="filteredCountries" @complete="search" fluid />
</template>

<script lang="ts" setup>
import AutoComplete from 'primevue/autocomplete';
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import { CountryService } from '~~/utils/contries';

//props
type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {});

type sizeType = 'small' | 'large' | undefined | null;

interface InputProps {
  type?: InputType;
  name?: string;
  id?: string;
  placeholder?: string;
  // value?: string;
  disabled?: boolean;
  fluid?: boolean;
  size?: sizeType;
  invalid?: boolean | undefined | null;
  variant?: 'outlined' | 'filled' | undefined | null;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  placeholder: '',
  name: 'input',
  id: 'input',
  fluid: true,
  invalid: false,
});

//data
//const value = defineModel<string | null>({ required: false, default: null });

onMounted(() => {
  CountryService.getCountries().then((data) => (countries.value = data));
});

const countries = ref();
const selectedCountry = ref();
const filteredCountries = ref();

const search = (event: AutoCompleteCompleteEvent) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCountries.value = [...countries.value];
    } else {
      filteredCountries.value = countries.value.filter((country: { name: string }) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};


</script>
