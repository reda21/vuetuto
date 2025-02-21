<template>
  <div>
    <button :class="buttonClasses" :disabled="disabled || lazy">
      <span v-if="icon" :class="iconClass">
        <UiIcon
          :rotation="lazy ? 'right' : 'none'"
          :icon="lazy ? 'refresh' : icon"
        />
      </span>
      <span :class="textClass">
        {{ label || "Click me" }}
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, withDefaults, defineProps } from "vue";
import { Icon } from "@iconify/vue";

interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-warning"
    | "outline-danger"
    | "outline-info"
    | "outline-light"
    | "outline-dark";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  label?: string;
  icon?: string;
  iconPos?: "left" | "right" | "top" | "bottom";
  type?: "button" | "reset" | "submit" | null;
  lazy?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  label: "Click me",
  icon: undefined,
  iconPos: "left",
  type: "button",
  lazy: false,
});

const buttonClasses = computed(() => {
  let classes = ["btn"];
  if (props.variant) {
    classes.push(`btn-${props.variant}`);
  }
  if (props.size) {
    classes.push(`btn-${props.size}`);
  }
  return classes.join(" ");
});

const iconClass = computed(() => {
  let classes = ["icon"];
  if (props.iconPos === "left") {
    classes.push("icon-left");
  } else if (props.iconPos === "right") {
    classes.push("icon-right");
  } else if (props.iconPos === "top") {
    classes.push("icon-top");
  } else if (props.iconPos === "bottom") {
    classes.push("icon-bottom");
  }
  return classes.join(" ");
});

const textClass = computed(() => {
  let classes = ["text"];
  if (props.iconPos === "left" || props.iconPos === "right") {
    classes.push("text-inline");
  } else if (props.iconPos === "top" || props.iconPos === "bottom") {
    classes.push("text-block");
  }
  return classes.join(" ");
});
</script>

<style>
/* Ajoutez ici des styles supplémentaires si nécessaire */
</style>
