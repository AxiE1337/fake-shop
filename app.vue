<script setup lang="ts">
const theme = useThemeState()
</script>

<template>
  <div :data-theme="theme">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
