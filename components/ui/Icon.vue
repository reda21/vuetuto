<script setup lang="ts">
import { Icon as IconifyIcon, Icon } from "@iconify/vue";

interface IconProps {
	icon?: string;
	inline?: boolean;
	hf?: boolean;
	vf?: boolean;
	rotation?: "right" | "left" | "none";
	iconFamily?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
	icon: "home",
	inline: true,
	hf: false,
	vf: false,
	rotation: "none",
	iconFamily: "mdi",
});

const iconClass = computed(() =>
	props.rotation === "right"
		? "right-rotation"
		: props.rotation === "left"
			? "left-rotation"
			: null,
);

const iconName = computed(() => `${props.iconFamily}:${props.icon}`);
</script>

<template>
  <IconifyIcon
    :class="iconClass"
    :icon="iconName"
    :inline="inline"
    :ssr="false"
    :horizontalFlip="hf"
    :verticalFlip="vf"
  />
</template>
