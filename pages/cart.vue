<script setup lang="ts">
import { ICart } from '~/types'

const cart = useCart()
const handleAdd = (item: ICart) => {
  if (!item) return
  if (item.quantity > 0) {
    const index = cart.value.findIndex((i) => i.id === item.id)
    cart.value[index].quantity += 1
  } else {
    cart.value.push({ ...item, quantity: 1 })
  }
  useStorage({ key: 'cart', value: cart.value, action: 'set' })
}
const handleDelete = (item: ICart) => {
  if (!cart.value) return
  if (item?.quantity > 1) {
    const index = cart.value.findIndex((i) => i.id === item.id)
    cart.value[index].quantity -= 1
  } else {
    cart.value = cart.value.filter((i) => i.id !== item.id)
  }
  useStorage({ key: 'cart', value: cart.value, action: 'set' })
}
const computeTotal = (): number => {
  if (!cart.value) return 0
  return cart.value.reduce((prev, next) => prev + next.price * next.quantity, 0)
}
const handleCheckOut = () => {
  cart.value = []
  useStorage({ key: 'cart', value: [], action: 'set' })
  return navigateTo('/')
}
</script>
<template>
  <main class="flex flex-col min-h-screen items-center justify-center">
    <h1 class="text-xl" v-if="cart.length === 0">Cart is empty</h1>
    <div
      v-for="item in cart"
      class="flex flex-col items-center justify-center gap-2 shadow-md mt-5 px-2"
    >
      <h1
        class="cursor-pointer text-xl hover:underline"
        @click="navigateTo(`/item/${item.id}`)"
      >
        {{ item.title }}
      </h1>
      <nuxt-img class="w-20" :src="item.image" :alt="item.title" />
      <h1>{{ item.price + '$' }}</h1>
      <h1>{{ 'Quantity ' + item.quantity }}</h1>
      <div>
        <button
          className="btn btn-xs btn-ghost text-xl"
          @click="() => handleDelete(item)"
        >
          -
        </button>
        <button
          className="btn btn-xs btn-ghost text-xl"
          @click="() => handleAdd(item)"
        >
          +
        </button>
      </div>
    </div>
    <h1 class="text-lg p-2" v-if="cart.length > 0">
      {{ 'Total: ' + computeTotal() + '$' }}
    </h1>
    <button
      v-if="cart.length > 0"
      @click="handleCheckOut"
      class="btn btn-ghost"
    >
      Checkout
    </button>
  </main>
</template>
