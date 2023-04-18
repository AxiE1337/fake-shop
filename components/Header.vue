<script setup lang="ts"></script>

<template>
  <header>
    <nav
      class="flex items-center justify-between p-2 h-16 bg-slate-600 dark:bg-slate-900 text-white"
    >
      <button class="btn btn-xs" @click="() => navigateTo('/')">Store</button>
      <div class="flex">
        <Cart />
        <Menu />
      </div>
    </nav>
  </header>
</template>
