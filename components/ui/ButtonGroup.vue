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
  let classes = [!props.vertical ?props.bsPrefix : `${props.bsPrefix}-vertical`];
 // 
 // if (props.size) classes.push(`${props.bsPrefix}-${props.size}`);
 // if (props.vertical) classes.push(`${props.bsPrefix}-vertical`);
  return classes.join(" ");
});



/*
https://flowbite.com/docs/components/button-group/
https://www.material-tailwind.com/docs/html/button-group
https://react-bootstrap.github.io/docs/components/button-group/
https://getbootstrap.com/docs/5.3/components/button-group/
https://www.trae.ai/
https://www.shadcn-vue.com/docs/components/button

<div class="flex flex-col space-y-2" role="group" aria-label="Vertical radio toggle button group">
  <input type="radio" id="vbtn-radio1" name="vbtn-radio" class="hidden peer/vbtn-radio1" checked>
  <label for="vbtn-radio1" class="px-4 py-2 border border-red-500 text-red-500 rounded-md cursor-pointer peer-checked/vbtn-radio1:bg-red-500 peer-checked/vbtn-radio1:text-white transition">
    Radio 1
  </label>

  <input type="radio" id="vbtn-radio2" name="vbtn-radio" class="hidden peer/vbtn-radio2">
  <label for="vbtn-radio2" class="px-4 py-2 border border-red-500 text-red-500 rounded-md cursor-pointer peer-checked/vbtn-radio2:bg-red-500 peer-checked/vbtn-radio2:text-white transition">
    Radio 2
  </label>

  <input type="radio" id="vbtn-radio3" name="vbtn-radio" class="hidden peer/vbtn-radio3">
  <label for="vbtn-radio3" class="px-4 py-2 border border-red-500 text-red-500 rounded-md cursor-pointer peer-checked/vbtn-radio3:bg-red-500 peer-checked/vbtn-radio3:text-white transition">
    Radio 3
  </label>
</div>
 */
</script>
