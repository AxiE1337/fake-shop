import { IProduct } from '~/types'

const handleSort = (
  items: IProduct[] | null,
  sortParams: string,
  searchParams: string
): IProduct[] | undefined => {
  if (!items) return
  switch (sortParams) {
    case 'by-price-asc':
      items = items.sort((a, b) => b.price - a.price)
      break
    case 'by-price-desc':
      items = items.sort((a, b) => a.price - b.price)
      break
    case 'by-name-asc':
      items = items.sort((a, b) => ('' + a.title).localeCompare(b.title))
      break
    case 'by-name-desc':
      items = items.sort((a, b) => ('' + b.title).localeCompare(a.title))
      break
    case 'by-rating-asc':
      items = items.sort((a, b) => b.rating.rate - a.rating.rate)
      break
    case 'by-rating-desc':
      items = items.sort((a, b) => a.rating.rate - b.rating.rate)
      break
    default:
      break
  }
  return items?.filter((i) =>
    i.title.toLocaleLowerCase().includes(searchParams.toLocaleLowerCase())
  )
}

export default handleSort
