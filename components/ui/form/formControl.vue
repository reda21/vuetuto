<template>
  <div class="mb-4">
    <UiFormLabel :for="name" :id="id ?? name">{{ label }}</UiFormLabel>
    <slot />
    {{ errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { CustomError } from '@/utils/customError';
import { useField } from '~/composables/useField';

interface FormControlValues {
  name: string;
  label: string;
  id?: string;
}

//@ts-ignore
const props = withDefaults(defineProps<FormControlValues>(), {});

//useField
const { errorMessage } = useField(props.name);

/*
 :invalid="errors && errors.has(name)"

 <p v-if="errors && errors.has(name)" class="text-danger mt-1 text-sm">
      {{ errors?.first(name) }}
    </p>

//inject
const errors = inject<CustomError>('errors');
*/
</script>
