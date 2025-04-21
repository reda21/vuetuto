<template>
  <BTN unstyled :pt="theme" :severity="severity" :loading="true" :data-b="[variant, size].join(' ')" />
</template>

<script lang="ts" setup>
// @ts-ignore
import { computed, withDefaults, defineProps, useAttrs } from 'vue';
// @ts-ignore
import BTN, { type ButtonPassThroughOptions, type ButtonProps } from 'primevue/button';
import { PendingKey } from "@/composables/useForm"

interface Props extends /* @vue-ignore */ ButtonProps {
  variant?: 'soft' | 'outlined' | 'subtle' | 'ghost' | 'link' | undefined;
  severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

const theme = ref<ButtonPassThroughOptions>({
  root: `btn`,
  loadingIcon: `animate-spin`,
  icon: `p-right:order-1 p-bottom:order-2`,
  label: `font-medium p-icon-only:invisible p-icon-only:w-0
        p-small:text-sm p-large:text-[1.125rem]`,
  pcBadge: {
    root: `min-w-4 h-4 leading-4 bg-primary-contrast rounded-full text-primary text-xs font-bold`,
  },
});

const pending = inject<Ref<boolean>>(PendingKey)

const lazy = computed(() =>{
  console.info("lazy", pending?.value)
  return  (pending?.value ?? false) || props.loading;
});



onMounted(() => {
  console.info("pending", pending?.value)
})

</script>

<style></style>
