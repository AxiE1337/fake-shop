<script setup lang="ts">
import { IProduct } from '~/types'

const { params } = useRoute()
useHead({
  title: (params.category as string) || 'Categoty',
})
const {
  data: products,
  pending,
  error,
} = await useFetch<IProduct[]>(
  `https://fakestoreapi.com/products/category/${params.category}`,
  { lazy: true }
)
</script>

<template>
  <main class="flex flex-col min-h-screen items-center justify-center">
    <h1 v-if="products && products?.length > 0">{{ params.category }}</h1>
    <h1 v-else-if="products && products?.length === 0">
      No products were found
    </h1>
    <h1 v-if="pending">Loading...</h1>
    <div class="flex flex-col items-center gap-5 my-16">
      <section
        v-for="product in products"
        class="flex flex-col gap-2 w-4/5 p-2 shadow-md blurre-in"
      >
        <h1
          @click="
            () => {
              navigateTo(`/item/${product.id}`)
            }
          "
          class="cursor-pointer text-2xl"
        >
          {{ product.title }}
        </h1>
        <h2>{{ 'Price ' + product.price + '$' }}</h2>
        <h2>{{ 'Category ' + product.category }}</h2>
        <p>{{ 'Description: ' + product.description }}</p>
        <img :src="product.image" alt="img" class="w-1/4" />
        <p>{{ product.rating.rate }}</p>
        <div class="rating">
          <input
            v-for="r in Math.floor(product.rating.rate)"
            type="radio"
            name="rating-1"
            class="mask mask-star-2 bg-green-400"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.blurre-in {
  -webkit-animation: blurre-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation: blurre-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}
@keyframes blurre-in {
  0% {
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}
</style>
