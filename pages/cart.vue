<script setup lang="ts">
import { ICart } from '~/types'

const cart = useCart()
onMounted(() => {
  cart.value = useStorage({ key: 'cart', action: 'get' }) || []
})
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
</script>
<template>
  <main class="flex flex-col min-h-screen items-center justify-center">
    <h1 class="text-xl" v-if="cart.length === 0">Cart is empty</h1>
    <div
      v-for="item in cart"
      class="flex flex-col items-center justify-center gap-1 border-t-2"
    >
      <h1 class="cursor-pointer" @click="navigateTo(`/item/${item.id}`)">
        {{ 'ItemId ' + item.id }}
      </h1>
      <h1>{{ item.title }}</h1>
      <h1>{{ item.price + '$' }}</h1>
      <h1>{{ 'Quantity ' + item.quantity }}</h1>
      <div>
        <button className="btn btn-xs" @click="() => handleDelete(item)">
          -
        </button>
        <button className="btn btn-xs" @click="() => handleAdd(item)">+</button>
      </div>
    </div>
    <h1 v-if="cart.length > 0">{{ 'Total:' + computeTotal() }}</h1>
  </main>
</template>
