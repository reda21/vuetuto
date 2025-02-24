<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    v-bind="componentAttrs"
    @click="onClick"
    @change="onChange"
  >
    <svg
      v-if="lazy"
      aria-hidden="true"
      role="status"
      class="me-3 inline h-4 w-4 animate-spin text-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
    <span v-if="icon && !lazy" :class="iconClass">
      <UiIcon :rotation="lazy ? 'right' : 'none'" :icon="icon" />
    </span>
    <span :class="textClass">
      {{ lazy ? "chargement..." : label || "Click me" }}
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed, withDefaults, defineProps } from "vue";

type ButtonType = "button" | "submit" | "reset";
type ElementType = "button" | "a" | "input";

type VariantType =
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
  | "outline-dark"
  | "gradient-primary";

type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type RoundedType = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface ButtonProps {
  variant?: VariantType;
  size?: SizeType;
  label?: string;
  icon?: string;
  iconPos?: "left" | "right" | "top" | "bottom";
  type?: ButtonType;
  lazy?: boolean;
  disabled?: boolean;
  as?: ElementType;
  href?: string; // Optionnel, pour le cas d'un lien
  rounded?: RoundedType;
  full?: boolean;
  bsPrefix?: string;
  active?: boolean;
  onChange?: (event: Event) => void;
  onClick?: (event: MouseEvent) => void;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  label: "Click me",
  icon: undefined,
  iconPos: "left",
  type: "button" as ButtonType,
  lazy: false,
  disabled: false,
  as: "button" as ElementType,
  href: "#",
  rounded: "full",
  full: false,
  bsPrefix: "btn",
  active: false,
  onChange: () => {},
  onClick: () => {},
});

const componentType = computed(() => props.as);

const componentAttrs = computed(() => {
  if (props.as === "a") {
    return { href: props.href, role: "button" };
  } else if (props.as === "input") {
    return {
      type: props.type,
      value: props.label,
      disabled: props.disabled || props.lazy,
    };
  } else {
    return { type: props.type, disabled: props.disabled || props.lazy };
  }
});

const buttonClasses = computed(() => {
  let classes = [props.bsPrefix || "btn"];
  if (props.variant) classes.push(`btn-${props.variant}`);

  if (props.size) classes.push(`btn-${props.size}`);

  if (props.rounded) classes.push(`rounded-${props.rounded}`);

  if (props.active) classes.push("active");

  if (props.full) classes.push(`w-full`);
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
