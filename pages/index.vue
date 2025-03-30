<template>
  <div>
    <div class="p-4 pt-22">
      <div class="grid gap-14 md:grid-cols-3 md:gap-5">
        <div class="bg-light-second dark:bg-dark-second rounded-xl p-6 text-center shadow-xl">
          <div
            class="mx-auto flex h-32 w-32 -translate-y-22 transform items-center justify-center rounded-full bg-[#687bae] shadow-lg shadow-[#687bae]"
          >
            <SvgPhp class="h-24 w-24 text-white" />
          </div>
          <h3 class="text-light-font dark:text-dark-font mb-3 text-xl font-medium lg:px-14">
            TREE AND SHRUB PRUNING
          </h3>
          <p class="px-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iure inventore amet modi
            accusantium vero perspiciatis, incidunt dicta sed aspernatur!
          </p>
        </div>
        <div class="bg-light-02 rounded-xl p-6 text-center shadow-xl dark:bg-[#2e3267]">
          <div
            class="shadows mx-auto flex h-32 w-32 -translate-y-22 transform items-center justify-center rounded-full bg-rose-500 shadow-rose-500/40"
          >
            <SvgJs class="h-24 w-24 text-white" />
          </div>
          <h1 class="text-darken mb-3 text-xl font-medium lg:px-14">IRRIGATION & DRAINAGE</h1>
          <p class="px-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iure inventore amet modi
            accusantium vero perspiciatis, incidunt dicta sed aspernatur!
          </p>
        </div>
        <div class="bg-light-02 rounded-xl p-6 text-center shadow-xl dark:bg-[#2e3267]">
          <div
            class="mx-auto flex h-32 w-32 -translate-y-22 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-500/40"
          >
            <SvgCss3 class="h-24 w-24 text-white" />
          </div>
          <h1 class="text-darken mb-3 pt-3 text-xl font-medium lg:h-14 lg:px-14">
            GARDEN BED MAINTENANCE
          </h1>
          <p class="px-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iure inventore amet modi
            accusantium vero perspiciatis, incidunt dicta sed aspernatur!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default', // correspond au fichier layouts/blog.vue
});
</script>
