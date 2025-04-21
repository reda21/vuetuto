<template>
  <div>
    <h1 class="text-light-font dark:text-dark-font text-lg font-bold mb-3">page test</h1>
    <Parent ref="parent" v-slot="{count, double}">
      <Enfant />
      <p class="text-light-font dark:text-dark-font">parent count: {{ count }} / {{ typeof double }}</p>
    </Parent>
    <button 
      @click="parent?.decrement()" 
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
    >
      decrement
    </button>
  </div>
</template>

<script setup lang="ts">
import Parent from  "@/components/parent.vue"

const parent = ref<InstanceType<typeof Parent> | null>(null)

onMounted(() => {
  if (parent.value) {
    console.log("parent", parent.value)
    console.log("parent count", parent.value.count)
    console.log("parent double", parent.value.double)
  }
})

</script>
