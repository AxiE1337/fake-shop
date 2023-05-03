<script setup lang="ts">
import { IProduct } from '~/types'

defineProps<IProps>()
interface IProps {
  product: IProduct
}
</script>

<template>
  <nuxt-img
    :src="product.image"
    alt="img"
    loading="lazy"
    class="w-1/4 rounded md:w-3/4"
  />
  <h1
    @click="
      () => {
        navigateTo(`/item/${product.id}`)
      }
    "
    class="cursor-pointer text-2xl hover:underline"
  >
    {{ product.title }}
  </h1>
  <h2>{{ 'Price ' + product.price + '$' }}</h2>
  <h2>{{ 'Category ' + product.category }}</h2>
  <p class="md:hidden">{{ product.description }}</p>
  <p>{{ product.rating.rate }}</p>
  <div class="rating">
    <input
      v-for="r in Math.floor(product.rating.rate)"
      disabled
      type="radio"
      name="rating-1"
      class="mask mask-star-2 bg-green-400"
    />
  </div>
</template>
