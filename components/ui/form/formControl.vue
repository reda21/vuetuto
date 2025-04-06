<template>
  <div class="mb-4">
    <UiFormLabel :for="name" :id="id ?? name" :invalid="errors && errors.has(name)">{{
      label
    }}</UiFormLabel>
    <slot />
    <p v-if="errors && errors.has(name)" class="text-danger mt-1 text-sm">
      {{ errors?.first(name) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { CustomError } from '@/utils/customError';

interface FormControlValues {
  name: string;
  label: string;
  id?: string;
}

//@ts-ignore
const props = withDefaults(defineProps<FormControlValues>(), {});

//inject
const errors = inject<CustomError>('errors');
</script>
