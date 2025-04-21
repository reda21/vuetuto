<template>
  <div>
    <h3 class="text-light-font dark:text-dark-font">Parent {{ count }}</h3>
    <slot :count="count" :increment="increment" :decrement="decrement" :double="double"/>
    <p class="text-red-500" @click="increment">inscrement</p>
  </div>
</template>

<script lang="ts" setup>
const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const double = computed(() => count.value * 2)

// Fournir les données aux composants enfants
provide('count', count)
provide('increment', increment)
provide('decrement', decrement)
provide('double', double)

//@ts-ignore
defineExpose({
  count,
  increment,
  decrement,
  double
})
</script>

<style></style>
