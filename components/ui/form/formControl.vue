<template>
  <div class="mb-2">
    <UiFormLabel :invalid="hasError" :for="name" :id="id ?? name">{{ label }}</UiFormLabel>
    <slot />
    <p v-if="hasError" class="text-danger mt-1 text-sm">
      {{ oneError }}
    </p>
    <p>panding : {{ meta.pending }}</p>
  </div>
</template>

<script lang="ts" setup>
//components\ui\form\formControl.vue
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
const { hasError, oneError, meta } = useField({ name: props.name });

/*
 :invalid="errors && errors.has(name)"

 <p v-if="errors && errors.has(name)" class="text-danger mt-1 text-sm">
      {{ errors?.first(name) }}
    </p>

//inject
const errors = inject<CustomError>('errors');
*/
</script>
