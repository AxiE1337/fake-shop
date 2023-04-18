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
    <h1>Categories</h1>
    <div class="flex flex-col gap-5 my-16">
      <div v-for="category in categories" class="flex bg-slate-300 p-2">
        <h1
          @click="
            () => {
              navigateTo(`/category/${category}`)
            }
          "
          class="cursor-pointer"
        >
          {{ category }}
        </h1>
      </div>
    </div>
  </main>
</template>
