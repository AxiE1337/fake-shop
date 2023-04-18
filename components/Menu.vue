<script setup lang="ts">
import SwapBtn from '../components/ui/SwapBtn.vue'

const handleChangeTheme = (value: string) => {
  useTheme(value === 'light' ? 'dark' : 'light')
}
</script>
<template>
  <div class="flex">
    <SwapBtn
      :value="useThemeState().value"
      :onChange="(value) => handleChangeTheme(value)"
    />
  </div>
</template>
