import {create} from 'zustand'

import type {BookingType} from '@/types'

export type UserStore = {
  bookings: BookingType[]
  setBooking: (bookings: BookingType[]) => void
  addBooking: (item: BookingType) => void
  removeBooking: (id: string) => void
}

export default create<UserStore>((set) => ({
  bookings: [],
  setBooking: (data) =>
    set(() => {
      return {
        bookings: data
      }
    }),
  addBooking: (item) =>
    set((state) => {
      if (!item) {
        return state
      }
      const clone = JSON.parse(JSON.stringify(state.bookings)) as BookingType[]
      const isExist = clone.some((i) => i.propertyId === item.id)
      if (isExist) {
        return state
      }
      clone.push(item)
      return {
        bookings: clone
      }
    }),
  removeBooking: (id) =>
    set((state) => {
      if (!id) {
        return state
      }
      return {
        bookings: state.bookings.filter((i) => i.id !== id)
      }
    })
}))
