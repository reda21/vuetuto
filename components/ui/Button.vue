<template>
  <div>
    <button :class="buttonClasses">
      <slot>Click me</slot>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, withDefaults, defineProps } from 'vue';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: undefined,
  size: 'md',
});

const buttonClasses = computed(() => {
  let classes = ['btn'];
  if (props.variant) {
    classes.push(`btn-${props.variant}`);
  }
  if (props.size) {
    classes.push(`btn-${props.size}`);
  }
  return classes.join(' ');
});
</script>

<style>
/* Ajoutez ici des styles supplémentaires si nécessaire */
</style>