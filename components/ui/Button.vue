<template>
  <component :is="componentType" class="btn" v-bind="componentAttrs" @click="onClick" @dblclick="onDblClick"
    @mouseenter="onMouseenter" @mouseleave="onMouseleave" @touchstart="onTouchstart" @focus="onFocus" @blur="onBlur"
    @animationend="onAnimationend" @animationstart="onAnimationstart" @transitionend="onTransitionend"
    @mousedown="onMousedown" @mouseup="onMouseup" @keydown="onKeydown" @keyup="onKeyup" @change="onChange">
    <InputIcon v-if="loading || icon" :class="loading ? 'pi pi-spin pi-spinner' : icon" />
    <span :class="spanClass" v-if="props.label">{{ props.label }} </span>
    <slot v-else></slot>
    <span data-p="circle secondary" class="min-w-4 h-4 bg-primary rounded-full text-white text-xs font-bold"
      data-pc-name="pcbadge" data-pc-extend="badge" pc0_9="" data-pc-section="root">2</span>
  </component>
</template>

<script lang="ts" setup>
// @ts-ignore
import { computed, withDefaults, defineProps } from 'vue';
//@ts-ignore
import InputIcon from 'primevue/inputicon';
import type { ButtonProps, ButtonType, ElementType } from '@/types/ui/button';
import { PendingKey } from "@/composables/useForm"

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
  onClick: () => {},
  onDblClick: () => {},
  onMouseenter: () => {},
  onMouseleave: () => {},
  onTouchstart: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onAnimationend: () => {},
  onAnimationstart: () => {},
  onTransitionend: () => {},
  onMousedown: () => {},
  onMouseup: () => {},
  onKeydown: () => {},
  onKeyup: () => {},
  onChange: () => {}
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
    disabled: props.disabled || loading.value,
  };

  // Ajout dynamique de tous les attributs ARIA présents dans les props
  const ariaProps = [
    'ariaExpanded',
    'ariaPressed',
    'ariaDescribedby',
    'ariaControls',
    'ariaHaspopup',
    'ariaCurrent',
    'ariaLive',
    'ariaAtomic',
    'ariaRelevant',
    'ariaDisabled',
    'ariaHidden',
    'ariaLabelledby'
  ];
  ariaProps.forEach(key => {
    if (key in props && props[key as keyof typeof props] !== undefined) {
      // Conversion camelCase -> kebab-case pour les attributs HTML
      const htmlKey = 'aria-' + key.replace(/^aria/, '').replace(/[A-Z]/g, m => '-' + m.toLowerCase());
      (baseAttrs as Record<string, any>)[htmlKey] = props[key as keyof typeof props];
    }
  });

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

const pending = inject<Ref<boolean>>(PendingKey)

const loading = computed(() => {
  console.info("lazy", pending?.value)
  return (pending?.value ?? false) || props.lazy;
});

onMounted(() => {
  console.info("pending", pending?.value)
})

</script>

<style></style>
