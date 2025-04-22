<template>
  <div>
    <h1 class="text-light-font dark:text-dark-font mb-3 text-lg font-bold">page test</h1>
    <Parent ref="parent" v-slot="{ count, double }">
      <Enfant />
      <p class="text-light-font dark:text-dark-font">
        parent count: {{ count }} / {{ typeof double }}
      </p>
    </Parent>
    <button
      @click="parent?.decrement()"
      class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
    >
      decrement
    </button>
  </div>
</template>

<script setup lang="ts">
import Parent from '@/components/parent.vue';

const parent = ref<InstanceType<typeof Parent> | null>(null);

onMounted(() => {
  if (parent.value) {
    console.log('parent', parent.value);
    console.log('parent count', parent.value.count);
    console.log('parent double', parent.value.double);
  }
});
</script>
