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
 */
</script>
