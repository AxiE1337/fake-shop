<script setup lang="ts">
import { IProduct } from '~/types'

const { params } = useRoute()
const searchParams = useState<string>('searchParams', () => '')
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
const handleFilter = () => {
  if (!products.value) return
  return products.value?.filter((i) =>
    i.title.toLocaleLowerCase().includes(searchParams.value.toLocaleLowerCase())
  )
}
</script>

<template>
  <main class="flex flex-col min-h-screen items-center justify-center">
    <h1 class="my-2 uppercase text-xl" v-if="products && products?.length > 0">
      {{ params.category }}
    </h1>
    <h1 v-else-if="products && products?.length === 0">
      No products were found
    </h1>
    <input
      type="text"
      class="input"
      placeholder="search..."
      v-if="!pending"
      :value="searchParams"
      @change="(e: any) => searchParams = e.target.value"
    />
    <h1 v-if="pending">Loading...</h1>
    <div class="flex flex-col items-center gap-5 my-16">
      <section
        v-for="product in handleFilter()"
        class="flex flex-col gap-2 w-4/5 p-2 shadow-md blurre-in"
      >
        <Item :product="product" />
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
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
