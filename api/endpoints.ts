const BASE_URL = process.env.EXPO_PUBLIC_API_URL
export default {
  properties: BASE_URL + '/properties',
  bookings: BASE_URL + '/bookings',
  profile: BASE_URL + '/profile'
}
