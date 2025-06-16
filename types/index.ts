export type Location = {
  address: string
  city: string
  state: string
  coordinates: Coordinates
}

export type Coordinates = {
  latitude: number
  longitude: number
}

export type PropertyType = {
  id: string
  title: string
  price: number
  location: Location
  features: string[]
  images: string[]
}
export type ProfileType = {
  id: string
  name: string
  email: string
  bookings: string[]
}
export type BookingType = {
  id: string
  propertyId: string
  checkIn: string
  checkOut: string
  status: string
  image: string
  propertyTitle: string
  location: string
}
export type UserProfile = {
  id: string
  name: string
  email: string
  bookings: string[]
}

export type ListItemType<T> = {
  item: T
  index: number
}
