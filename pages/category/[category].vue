<script setup lang="ts">
import { IProduct } from '~/types'

const { params } = useRoute()
const searchParams = useState<string>('searchParams', () => '')
const sortParams = useState<string>('sortParams', () => '')
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

const handleSortParams = (value: string) => {
  switch (value) {
    case 'by-price':
      const byPrice = document.querySelector('#by-price-btn')
      const byPriceOrder = byPrice?.getAttribute('data-order')
      byPrice?.setAttribute(
        'data-order',
        byPriceOrder === 'desc' ? 'asc' : 'desc'
      )
      sortParams.value = `by-price-${byPriceOrder}`
      break
    case 'by-rating':
      const byRating = document.querySelector('#by-price-btn')
      const byRatingOrder = byRating?.getAttribute('data-order')
      byRating?.setAttribute(
        'data-order',
        byRatingOrder === 'desc' ? 'asc' : 'desc'
      )
      sortParams.value = `by-rating-${byRatingOrder}`
      break
    case 'by-name':
      const byName = document.querySelector('#by-price-btn')
      const byNameOrder = byName?.getAttribute('data-order')
      byName?.setAttribute(
        'data-order',
        byNameOrder === 'desc' ? 'asc' : 'desc'
      )
      sortParams.value = `by-name-${byNameOrder}`
      break
    default:
      break
  }
}
</script>

<template>
  <main class="flex flex-col min-h-screen items-center justify-center">
    <section class="flex flex-col items-center justify-center my-5 mb-auto">
      <h1
        class="my-2 uppercase text-xl"
        v-if="products && products?.length > 0"
      >
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
        v-model="searchParams"
      />
      <div class="flex gap-4" v-if="!pending">
        <button
          class="btn btn-ghost btn-sm"
          data-order="asc"
          id="by-rating-btn"
          @click="handleSortParams('by-rating')"
        >
          by raiting{{ sortParams === 'by-rating-asc' ? '↑' : '↓' }}
        </button>
        <button
          class="btn btn-ghost btn-sm"
          data-order="asc"
          id="by-price-btn"
          @click="handleSortParams('by-price')"
        >
          by price{{ sortParams === 'by-price-asc' ? '↑' : '↓' }}
        </button>
        <button
          class="btn btn-ghost btn-sm"
          data-order="asc"
          id="by-name-btn"
          @click="handleSortParams('by-name')"
        >
          by name{{ sortParams === 'by-name-asc' ? '↑' : '↓' }}
        </button>
      </div>
    </section>
    <h1 v-if="pending">Loading...</h1>
    <div class="flex flex-col items-center gap-5 my-16">
      <section
        v-for="product in handleSort(products, sortParams, searchParams)"
        class="flex flex-col gap-2 w-4/5 p-2 shadow-md blurre-in"
      >
        <Item :product="product" />
      </section>
      <h1
        class="absolute top-2/4"
        v-if="handleSort(products, sortParams, searchParams)?.length === 0"
      >
        0 products were found
      </h1>
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
