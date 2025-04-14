<template>
  <BTN unstyled :pt="theme" :severity="severity" :data-b="[variant, size].join(' ')" />
</template>

<script lang="ts" setup>
// @ts-ignore
import { computed, withDefaults, defineProps, useAttrs } from 'vue';
// @ts-ignore
import BTN, { type ButtonPassThroughOptions, type ButtonProps } from 'primevue/button';
import { ptViewMerge } from '@/components/v/utils';

interface Props extends /* @vue-ignore */ ButtonProps {
  variant?: 'soft' | 'outlined' | 'subtle' | 'ghost' | 'link' | undefined;
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | undefined;
}

const props = defineProps<Props>();

const theme = ref<ButtonPassThroughOptions>({
  root: `btn`,
  loadingIcon: ``,
  icon: `p-right:order-1 p-bottom:order-2`,
  label: `font-medium p-icon-only:invisible p-icon-only:w-0
        p-small:text-sm p-large:text-[1.125rem]`,
  pcBadge: {
    root: `min-w-4 h-4 leading-4 bg-primary-contrast rounded-full text-primary text-xs font-bold`,
  },
});
</script>

<style></style>
