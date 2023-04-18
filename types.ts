export interface IProduct {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
export interface ICart extends IProduct {
  quantity: number
}
export type Theme = 'dark' | 'light'
