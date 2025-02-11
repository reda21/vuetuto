<template>
  <h2>la meteo</h2>
  {{ data }}
</template>

<script lang="ts" setup>
const getWeeklyWeather = async () => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Paris`,
  );
  const data = await response.json();
  return data;
};

const data = await getWeeklyWeather();
console.info(data);
</script>
