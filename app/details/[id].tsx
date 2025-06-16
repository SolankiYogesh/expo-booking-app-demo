import Entypo from '@expo/vector-icons/Entypo'
import {useMutation, useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {useLocalSearchParams, useNavigation} from 'expo-router'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import {
  ActivityIndicator,
  InteractionManager,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'

import {useSharedValue} from 'react-native-reanimated'
import type {ICarouselInstance} from 'react-native-reanimated-carousel'
import Carousel, {Pagination} from 'react-native-reanimated-carousel'

import {endpoints} from '@/api'
import AppContainer from '@/components/AppContainer'
import AppHeader from '@/components/AppHeader'
import AppImage from '@/components/AppImage'
import EmptyView from '@/components/EmptyView'
import LoadingView from '@/components/LoadingView'
import Colors from '@/constants/Colors'
import getMapFrame from '@/helper/getMapFrame'
import tw from '@/helper/tw'
import {useBookingStore} from '@/store'
import type {BookingType, PropertyType} from '@/types'

import {WebView} from 'react-native-webview'

export default () => {
  // const router = useRouter()
  // for reviewer
  // we can also use below hook to use access multiple values from single Store hook
  // https://stackoverflow.com/a/78216267
  const booking = useBookingStore((state) => state.bookings)

  const addBooking = useBookingStore((state) => state.addBooking)

  const removeBooking = useBookingStore((state) => state.removeBooking)

  const navigation = useNavigation()
  const {width} = useWindowDimensions()
  const {id} = useLocalSearchParams()
  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true
    })
  }

  const {data, refetch, isLoading} = useQuery({
    queryKey: ['property-' + id],
    enabled: false,
    queryFn: async () => await axios.get<PropertyType>(endpoints.properties + '/' + id)
  })
  const isBooked = useMemo(
    () => booking.find((i) => i.propertyId === data?.data?.id),
    [booking, data?.data?.id]
  )

  const addMutation = useMutation({
    mutationFn: async (booking: BookingType) =>
      await axios.post<BookingType>(endpoints.bookings, booking),
    onSuccess(data) {
      if (data.data) {
        addBooking(data.data)
      }
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      await axios.delete<PropertyType>(endpoints.bookings + '/' + id),
    onSuccess() {
      if (isBooked) {
        removeBooking(isBooked.id)
      }
    }
  })

  useEffect(() => {
    navigation.setOptions({title: ''})
    InteractionManager.runAfterInteractions(() => {
      refetch()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const property = data?.data

  const onPressBook = useCallback(() => {
    if (!property) {
      return
    }
    if (!isBooked) {
      const bookingItem = {
        checkIn: new Date().toISOString(),
        checkOut: new Date().toISOString(),
        id: `booking-${booking.length}`,
        image: property?.images[0],
        location: `${property?.location.state}, ${property?.location.city}`,
        propertyId: property?.id,
        propertyTitle: property?.title,
        status: 'pending'
      }

      addMutation.mutate(bookingItem)
    } else {
      deleteMutation.mutate(isBooked.id)
    }
  }, [addMutation, booking.length, deleteMutation, isBooked, property])

  if (!property) {
    return null
  }

  return (
    <AppContainer>
      {!!property?.title && <AppHeader title={property.title} />}
      {isLoading ? (
        <LoadingView />
      ) : !property ? (
        <EmptyView />
      ) : (
        <ScrollView contentContainerStyle={tw`pb-6`} style={tw`flex-1 bg-white`}>
          <View>
            <Carousel
              ref={ref}
              width={width}
              height={width * 0.66}
              data={property?.images ?? []}
              onProgressChange={progress}
              autoPlay
              loop
              renderItem={({item}) => <AppImage source={item} style={tw`w-full h-full`} />}
            />
            <Pagination.Basic
              progress={progress}
              data={property?.images ?? []}
              containerStyle={tw`flex-row justify-center items-center mt-3 gap-x-2`}
              activeDotStyle={tw`w-3 h-3 bg-[${Colors.primary}] rounded-full`}
              dotStyle={tw`w-2 h-2 bg-[${Colors.gray300}] rounded-full`}
              onPress={onPressPagination}
            />
          </View>

          <View style={tw`px-5 mt-6`}>
            <Text style={tw`text-xl font-bold text-gray-900`}>{property?.title}</Text>
            <View style={tw`flex-row items-center gap-x-2  mt-1`}>
              <Entypo name="location-pin" size={24} color={Colors.primary} />
              <Text style={tw`text-base text-gray-600`}>
                {property?.location?.city}, {property?.location?.state}
              </Text>
            </View>

            <View style={tw`flex-row items-center mt-2`}>
              <Text style={tw`text-sm text-[${Colors.primary}]`}>⭐</Text>
              <Text style={tw`text-sm text-gray-700 ml-1`}>
                {(Math.random() * 5).toFixed(1)} / 5.0
              </Text>
            </View>

            <View style={tw`mt-5`}>
              <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>Features</Text>
              <View style={tw`flex-row items-center flex-wrap gap-3`}>
                {property?.features.map((feature) => (
                  <View
                    key={feature}
                    style={tw`p-2 rounded-lg bg-[${Colors.primary}] overflow-hidden`}
                  >
                    <Text style={tw`text-sm text-white`}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={tw`mt-5`}>
              <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>Location</Text>

              <WebView
                originWhitelist={['*']}
                style={tw`w-full h-[300px] rounded-lg overflow-hidden`}
                source={{
                  html: getMapFrame(
                    property.location.coordinates.latitude,
                    property.location.coordinates.longitude
                  )
                }}
                javaScriptEnabled
                domStorageEnabled
              />
            </View>
            <TouchableOpacity
              onPress={onPressBook}
              disabled={addMutation.isPending || deleteMutation.isPending}
              style={tw`bg-blue-500 px-6 py-3 mt-3 rounded-full`}
              activeOpacity={0.7}
            >
              {addMutation.isPending || deleteMutation.isPending ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={tw`text-white text-center text-base font-bold`}>
                  {isBooked ? 'Remove Booking' : 'Book Now'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </AppContainer>
  )
}
