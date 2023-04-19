<script setup lang="ts">
import SwapBtn from '../components/ui/SwapBtn.vue'

const handleChangeTheme = (value: string) => {
  useTheme(value === 'light' ? 'dark' : 'light')
}
</script>

<template>
  <header>
    <nav
      class="flex items-center justify-between p-2 h-16 bg-slate-600 dark:bg-slate-900 text-white"
    >
      <button class="btn btn-xs" @click="() => navigateTo('/')">Store</button>
      <div class="flex gap-2 px-2">
        <Cart />
        <SwapBtn
          :value="useThemeState().value"
          :onChange="(value) => handleChangeTheme(value)"
        />
      </div>
    </nav>
  </header>
</template>
