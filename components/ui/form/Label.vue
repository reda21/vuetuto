<template>
  <label :for="forAttr" class="mb-2 block text-sm font-medium"
    :class="{ 'text-danger': invalid, 'text-gray-900 dark:text-white': !invalid }" v-bind="$attrs">
    <slot></slot>
  </label>
</template>

<script lang="ts" setup>
//@ts-ignore
import { computed, withDefaults, defineProps } from 'vue';

interface LabelProps {
  forAttr?: string;
  id?: string;
  invalid?: boolean
}

const props = withDefaults(defineProps<LabelProps>(), {
  forAttr: 'input',
  id: 'input',
  invalid: false
});

// Si aucun id n'est fourni, on génère un id unique
const idComputed = computed(
  () => props.id || `label-${Math.random().toString(36).substring(2, 10)}`
);
</script>
