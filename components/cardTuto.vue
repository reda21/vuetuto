<template>
  <div
    class="bg-light-second dark:bg-dark-second relative mt-16 rounded-xl p-6 pt-22 text-center shadow-xl"
  >
    <div
      class="absolute inset-x-0 -top-16 left-0 mx-auto flex h-32 w-32 transform items-center justify-center rounded-full shadow-lg"
      :class="selectedColor"
    >
      <component :is="selectedIcon" class="h-24 w-24 text-white" />
    </div>
    <h3 class="text-light-font dark:text-dark-font mb-3 text-xl font-medium">
      TREE AND SHRUB PRUNING
    </h3>
    <p class="text-light-font dark:text-dark-font px-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iure inventore amet modi
      accusantium vero perspiciatis, incidunt dicta sed aspernatur!
    </p>
  </div>
</template>

<script lang="ts" setup>
import SvgPhp from '@/components/svg/php.vue';
import SvgJs from '@/components/svg/js.vue';
import SvgCss3 from '@/components/svg/css3.vue';

// @ts-ignore
const props = defineProps<{
  categorie: 'php' | 'js' | 'css';
}>();

const icons = {
  php: SvgPhp,
  js: SvgJs,
  css: SvgCss3,
};

const colors = {
  php: 'bg-[#777BB3] shadow-[#777BB3]', // Couleur officielle PHP
  js: 'bg-[#F7DF1E] shadow-[#F7DF1E]', // Couleur officielle JavaScript
  css: 'bg-[#264DE4] shadow-[#264DE4]', // Couleur officielle CSS3
};

const selectedIcon = computed(() => icons[props.categorie as keyof typeof icons]);
const selectedColor = computed(() => colors[props.categorie as keyof typeof colors]);
</script>
