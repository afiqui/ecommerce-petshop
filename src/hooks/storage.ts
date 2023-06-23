import { Product } from "@prisma/client"

export const getStorage = () => (JSON.parse(localStorage.getItem("cart") || "[]") || []) as Product[]
export const setStorage = (items: Product[]) => localStorage.setItem("cart", JSON.stringify(items))
export const addStorage = (item: Product) => {
  delStorage(item)
  const items = getStorage()
  setStorage([...items, item])
}
export const delStorage = (item: Product) => {
  const items = getStorage()
  setStorage(items.filter(v => v.id != item.id))
}