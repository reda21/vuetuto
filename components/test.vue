<template>
  <div class="mx-auto max-w-md border-x border-x-gray-200 px-4 py-6 dark:border-x-gray-800 dark:bg-gray-950/10">
  <fieldset class="space-y-3">
    <legend class="text-base font-semibold text-gray-900 dark:text-white">Today</legend>
    <div class="grid grid-cols-[1fr_24px] items-center gap-6">
      <label class="peer grid grid-cols-[auto_1fr] items-center gap-3 rounded-md px-2 hover:bg-gray-100 dark:hover:bg-white/5">
        <input class="peer size-3.5 appearance-none rounded-sm border border-gray-300 accent-pink-500 checked:appearance-auto dark:border-gray-600 dark:accent-pink-600" type="checkbox" checked="" />
        <span class="text-gray-700 select-none peer-checked:text-gray-400 peer-checked:line-through dark:text-gray-300">Create a to do list</span>
      </label>
      <div class="size-[26px] rounded-md p-1 peer-has-checked:hidden hover:bg-red-50 hover:text-pink-500">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    </div>
    <div class="grid grid-cols-[1fr_24px] items-center gap-6">
      <label class="peer grid grid-cols-[auto_1fr] items-center gap-3 rounded-md px-2 hover:bg-gray-100 dark:hover:bg-white/5">
        <input class="peer size-3.5 appearance-none rounded-sm border border-gray-300 accent-pink-500 checked:appearance-auto dark:border-gray-600 dark:accent-pink-600" type="checkbox" />
        <span class="text-gray-700 select-none peer-checked:text-gray-400 peer-checked:line-through dark:text-gray-300">Check off first item</span>
      </label>
      <div class="size-[26px] rounded-md p-1 peer-has-checked:hidden hover:bg-red-50 hover:text-pink-500">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    </div>
    <div class="grid grid-cols-[1fr_24px] items-center gap-6">
      <label class="peer grid grid-cols-[auto_1fr] items-center gap-3 rounded-md px-2 hover:bg-gray-100 dark:hover:bg-white/5">
        <input class="peer size-3.5 appearance-none rounded-sm border border-gray-300 accent-pink-500 checked:appearance-auto dark:border-gray-600 dark:accent-pink-600" type="checkbox" />
        <span class="text-gray-700 select-none peer-checked:text-gray-400 peer-checked:line-through dark:text-gray-300">Investigate race condition</span>
      </label>
      <div class="block size-[26px] rounded-md p-1 peer-has-checked:hidden hover:bg-red-50 hover:text-pink-500">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    </div>
  </fieldset>
</div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>