<template>
  <BTN unstyled  :data-p="mergedDataP" :ptOptions="{
      mergeProps: ptViewMerge,
    }">
   <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </BTN>
</template>

<script lang="ts" setup>
// @ts-ignore
import { computed, withDefaults, defineProps, useAttrs } from 'vue';
// @ts-ignore
import BTN, { type ButtonPassThroughOptions, type ButtonProps } from 'primevue/button';
import { ptViewMerge } from '@/components/v/utils';

// Récupère tous les attributs passés au composant
const attrs = useAttrs() as Record<string, unknown>

// On extrait `data-p` et on regroupe le reste
const { 'data-p': parentDataP, ...restAttrs } = attrs

const mergedDataP = computed<string>(() => {
  const parent = typeof parentDataP === 'string' ? parentDataP : ''
  // Ici on sépare par un espace, vous pouvez changer le séparateur si besoin
  return [parent, 'alpha']
    .filter(Boolean)
    .join(' ')
})

interface Props extends /* @vue-ignore */ ButtonProps {}
defineProps<Props>();


</script>
