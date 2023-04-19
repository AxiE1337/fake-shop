<script setup lang="ts">
import { ICart, IProduct } from '~/types'

const cart = useCart()
const { params } = useRoute()
const { data: product } = await useFetch<IProduct>(
  `https://fakestoreapi.com/products/${params.id}`
)
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
const handleDelete = () => {
  if (!isInCart()) return
  if ((isInCart()?.quantity as number) > 1) {
    const index = cart.value.findIndex((i) => i.id === isInCart()?.id)
    cart.value[index].quantity -= 1
  } else {
    cart.value = cart.value.filter((i) => i.id !== product.value?.id)
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
    <section v-if="product" class="flex md:flex-col justify-center gap-5 w-4/5">
      <img :src="product?.image" alt="img" class="w-1/4 md:w-3/4 rounded p-2" />
      <div class="flex flex-col justify-center gap-4">
        <h1 class="text-2xl">{{ product?.title }}</h1>
        <h2>{{ 'Price ' + product?.price + '$' }}</h2>
        <h2>{{ 'Category ' + product?.category }}</h2>
        <p>{{ 'Description: ' + product?.description }}</p>
        <p>{{ 'Rating: ' + product?.rating?.rate }}</p>
        <button class="btn indicator m-2" @click="handleAdd">
          add to the cart
          <span v-if="isInCart()" class="indicator-item badge">{{
            isInCart()?.quantity
          }}</span>
        </button>
        <button @click="handleDelete" v-if="isInCart()" class="btn w-32 m-2">
          {{ 'remove 1' }}
        </button>
      </div>
    </section>
  </main>
</template>
