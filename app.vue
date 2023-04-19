<script setup lang="ts">
const theme = useThemeState()
const cart = useCart()
onMounted(() => {
  cart.value = useStorage({ key: 'cart', action: 'get' }) || []
})
</script>

<template>
  <div :data-theme="theme">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
