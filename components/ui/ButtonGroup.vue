<template>
  <div :class="groupClasses" role="group" :aria-label="ariaLabel">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, withDefaults, defineProps } from "vue";
/**
 *
 * @param {string} [ariaLabel="Button group"]
 * @param {string} [bsPrefix="btn-group"]
 * @param {string} [size="md"]
 * @param {boolean} [vertical=false]
 */
interface ButtonGroupProps {
  ariaLabel?: string;
  bsPrefix?: string;
  size?: "sm" | "md" | "lg";
  vertical?: boolean;
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  ariaLabel: "Button group",
  bsPrefix: "btn-group",
  size: "md",
  vertical: false,
});

const groupClasses = computed(() => {
  let classes = [props.bsPrefix];
  if (props.size) classes.push(`${props.bsPrefix}-${props.size}`);
  if (props.vertical) classes.push(`${props.bsPrefix}-vertical`);
  return classes.join(" ");
});

/*
https://flowbite.com/docs/components/button-group/
https://www.material-tailwind.com/docs/html/button-group
https://react-bootstrap.github.io/docs/components/button-group/
https://getbootstrap.com/docs/5.3/components/button-group/
https://www.trae.ai/
https://www.shadcn-vue.com/docs/components/button

<div class="row m-3 *:not-first:rounded-l-none *:not-last:rounded-r-none flex" role="group" :aria-label="ariaLabel">
  <button class="btn-danger btn-md inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-hover disabled:bg-primary/50" type="button">
    <span class="text text-inline">alpha</span>
  </button>
  <button class="btn-danger btn-md inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-hover disabled:bg-primary/50" type="button">
    <span class="text text-inline">alpha</span>
  </button>
  <button class="btn-danger btn-md inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-hover disabled:bg-primary/50" type="button">
    <span class="text text-inline">alpha</span>
  </button>
  <button class="btn-danger btn-md inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-hover disabled:bg-primary/50" type="button">
    <span class="text text-inline">alpha</span>
  </button>
  <button class="btn-danger btn-md inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-hover disabled:bg-primary/50" type="button">
    <span class="text text-inline">alpha</span>
  </button>
</div>
 */
</script>
