<template>
  <component
    :is="componentType"
    class="btn"
    v-bind="componentAttrs"
    @click="onClick" 
    @change="onChange"
  >
    <InputIcon v-if="lazy || icon" :class="lazy ? 'pi pi-spin pi-spinner' : icon" />    
    <span :class="spanClass" v-if="props.label">{{ props.label }} </span>
    <slot v-else></slot>
  </component>
</template>

<script lang="ts" setup>
// @ts-ignore
import { computed, withDefaults, defineProps } from 'vue';
//@ts-ignore
import InputIcon from 'primevue/inputicon';
import type { ButtonProps, ButtonType, ElementType } from '@/types/ui/button';

const spanClass = "font-medium p-icon-only:invisible p-icon-only:w-0 p-small:text-sm p-large:text-[1.125rem]"

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  icon: undefined,
  iconPos: 'left',
  type: 'button' as ButtonType,
  lazy: false,
  disabled: false,
  as: 'button' as ElementType,
  href: '#',
  full: false,
  bsPrefix: 'btn',
  active: false,
  raised: false,
  onChange: () => {},
  onClick: () => {},
});

const componentType = computed(() => props.as);

const dataP = computed(() => {
  return [
    props.variant,
    props.size,
    props.rounded ? 'rounded-'+props.rounded : undefined,
    props.raised ? 'raised' : undefined,
  ]
    .filter(Boolean)
    .join(' ');
});

const componentAttrs = computed(() => {
  const baseAttrs = {
    'aria-label': props.ariaLabel || props.label,
    'data-b': dataP.value,
    'data-b-severity': props.severity,
    disabled: props.disabled || props.lazy,
  };

  if (props.as === 'a') {
    return { ...baseAttrs, href: props.href, role: 'button' };
  }

  if (props.as === 'input') {
    return { ...baseAttrs, type: props.type, value: props.label };
  }

  return { ...baseAttrs, type: props.type };
});

const buttonClasses = computed(() => {
  return 'btn';
});


</script>

<style></style>
