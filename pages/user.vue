<template>
  <div>
    <h1>user</h1>
    <p>You are currently {{ status }}.</p>
  </div>
</template>

<script lang="ts" setup>
const { status, signIn } = useAuth();
</script>

<style></style>
