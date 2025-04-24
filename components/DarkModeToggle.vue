<script setup>
import { useDarkMode } from '@/composables/useDarkMode';

const { isDark, toggleDark, icon, iconClass } = useDarkMode();
</script>

<template>
  <button @click="toggleDark" class="cursor-pointer">
    <svg
      v-if="!isDark"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      class="hover:text-blog-accent iconify iconify--heroicons h-6 w-6 text-gray-700 dark:text-gray-300"
      style=""
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M7.455 2.004a.75.75 0 0 1 .26.77a7 7 0 0 0 9.958 7.967a.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083"
        clip-rule="evenodd"
      ></path>
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      class="hover:text-blog-accent iconify iconify--heroicons h-6 w-6 text-gray-700 dark:text-gray-300"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M10 5.5a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9ZM10 1a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 10 1Zm0 15.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm9-6.5a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1A.75.75 0 0 1 19 10Zm-15.5.75A.75.75 0 0 1 3.75 10h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75ZM15.657 4.343a.75.75 0 0 1 0 1.06l-.707.708a.75.75 0 1 1-1.06-1.06l.707-.708a.75.75 0 0 1 1.06 0ZM5.11 14.89a.75.75 0 0 1 0 1.06l-.707.708a.75.75 0 1 1-1.06-1.06l.707-.708a.75.75 0 0 1 1.06 0Zm10.547 1.06a.75.75 0 0 1-1.06 0l-.708-.707a.75.75 0 0 1 1.06-1.06l.708.707a.75.75 0 0 1 0 1.06ZM5.818 5.818a.75.75 0 0 1-1.06 0l-.708-.707a.75.75 0 0 1 1.06-1.06l.708.707a.75.75 0 0 1 0 1.06Z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>
