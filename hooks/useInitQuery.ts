import {focusManager, onlineManager, useQuery} from '@tanstack/react-query'
import axios from 'axios'
import * as Network from 'expo-network'
import {useEffect} from 'react'
import type {AppStateStatus} from 'react-native'
import {AppState, Platform} from 'react-native'

import {endpoints} from '@/api'
import {useBookingStore} from '@/store'
import useUserStore from '@/store/useUserStore'
import type {BookingType, UserProfile} from '@/types'

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected)
  })
  return eventSubscription.remove
})
export default () => {
  const setUserData = useUserStore((state) => state.setUserData)
  const setBooking = useBookingStore((state) => state.setBooking)
  const getProfile = useQuery({
    queryKey: ['profile'],
    enabled: false,
    queryFn: async () => await axios.get<UserProfile>(endpoints.profile)
  })

  const getBooking = useQuery({
    queryKey: ['bookings'],
    enabled: false,
    queryFn: async () => await axios.get<BookingType[]>(endpoints.bookings)
  })

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active')
    }
  }

  useEffect(() => {
    getProfile.refetch().then((resp) => {
      if (resp.data) {
        setUserData(resp.data.data)
      }
    })
    getBooking.refetch().then((resp) => {
      if (resp.data) {
        setBooking(resp.data.data)
      }
    })
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
