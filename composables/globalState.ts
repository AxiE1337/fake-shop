import type { ICart, Theme } from '~/types'

export const useThemeCookie = () => useCookie<Theme>('themeCookie')

export const useThemeState = () =>
  useState<Theme>('theme', () => useThemeCookie().value || 'light')

export const useTheme = (theme: string) => {
  switch (theme) {
    case 'light':
      useThemeState().value = 'light'
      useThemeCookie().value = 'light'
      break
    case 'dark':
      useThemeState().value = 'dark'
      useThemeCookie().value = 'dark'
    default:
      break
  }
}

export const useCart = () => useState<ICart[]>('cart', () => [])

export const useStorage = ({
  key,
  value,
  action,
}: {
  key: string
  value?: ICart[]
  action: 'set' | 'get'
}) => {
  switch (action) {
    case 'set':
      return localStorage.setItem(key, JSON.stringify(value))
    case 'get':
      return JSON.parse(localStorage.getItem(key) as string)
  }
}
