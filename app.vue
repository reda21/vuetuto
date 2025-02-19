<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lauguage="ts">
const isDark = useDark();

onBeforeMount(() => {
  // Appliquer immédiatement le thème avant l'hydratation de Vue
  if (isDark.value) {
    console.info('dark mode is on')
    document.documentElement.classList.add('dark')
  } else {
    console.info('dark mode is off')
    document.documentElement.classList.remove('dark')
  }
})

onMounted(() => {});
</script>
