<script setup>
import { useDarkMode } from '@/composables/useDarkMode';

const { isDark, toggleDark, icon, iconClass } = useDarkMode();
</script>

<template>
    <button @click="toggleDark" class="classBtn">
        <Icon :icon="icon" :class="iconClass" />
    </button>
</template>