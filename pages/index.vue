<script setup lang="ts">
import { IProduct } from '~/types'

useHead({
  title: 'Store',
})
const { data: categories, pending } = await useFetch<IProduct[]>(
  'https://fakestoreapi.com/products/categories'
)
</script>

<template>
  <main class="flex flex-col min-h-screen items-center justify-center">
    <h1 class="text-[2rem]">Categories</h1>
    <div class="flex flex-wrap gap-5 my-16 h-full w-4/5">
      <button
        v-for="category in categories"
        @click="
          () => {
            navigateTo(`/category/${category}`)
          }
        "
        class="flex btn items-center justify-center border-2 rounded-lg p-5 h-full w-full"
      >
        <h1 class="select-none">
          {{ category }}
        </h1>
      </button>
    </div>
  </main>
</template>
