<script setup lang="ts">
import { ICart, IProduct } from '~/types'

const cart = useCart()
const { params } = useRoute()
const { data: product } = await useFetch<IProduct>(
  `https://fakestoreapi.com/products/${params.id}`
)
onMounted(() => {
  cart.value = useStorage({ key: 'cart', action: 'get' }) || []
})

const isInCart = (): ICart | null => {
  if (!cart.value) return null
  return cart.value.find((i) => i.id === +params.id) || null
}

const handleAdd = () => {
  if (!product.value) return
  if (isInCart()) {
    const index = cart.value.findIndex((i) => i.id === isInCart()?.id)
    cart.value[index].quantity += 1
  } else {
    cart.value.push({ ...product.value, quantity: 1 })
  }
  useStorage({ key: 'cart', value: cart.value, action: 'set' })
}
useHead({
  title: product.value?.title || 'Product',
})
</script>

<template>
  <main class="flex flex-col min-h-screen items-center justify-center">
    <h1 v-if="!product">No product was found</h1>
    <section v-if="product" class="flex justify-center gap-5 w-4/5">
      <img :src="product?.image" alt="img" class="w-1/4" />
      <div class="flex flex-col justify-center">
        <h1 class="text-2xl">{{ product?.title }}</h1>
        <h2>{{ 'Price ' + product?.price + '$' }}</h2>
        <h2>{{ 'Category ' + product?.category }}</h2>
        <p>{{ 'Description: ' + product?.description }}</p>
        <p>{{ product?.rating?.rate }}</p>
        <button class="btn" @click="handleAdd">add to the cart</button>
        <h1 v-if="isInCart()">
          You have {{ isInCart()?.quantity }} in the cart
        </h1>
      </div>
    </section>
  </main>
</template>
