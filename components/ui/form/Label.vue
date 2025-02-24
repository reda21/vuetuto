<template>
  <label
    :for="forAttr"
    :id="idComputed"
    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    v-bind="$attrs"
  >
    <slot></slot>
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface LabelProps {
  forAttr?: string;
  id?: string;
}

const props = withDefaults(defineProps<LabelProps>(), {
  forAttr: '',
  id: '',
});

// Si aucun id n'est fourni, on génère un id unique
const idComputed = computed(
  () => props.id || `label-${Math.random().toString(36).substring(2, 10)}`
);
</script>
