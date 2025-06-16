import {useRouter} from 'expo-router'
import {memo} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import AppImage from '@/components/AppImage'
import tw from '@/helper/tw'
import type {BookingType, ListItemType} from '@/types'

export default memo(
  ({item}: ListItemType<BookingType>) => {
    const router = useRouter()

    return (
      <TouchableOpacity
        onPress={() => router.navigate(`/details/${item.propertyId}`)}
        style={tw`bg-white m-3 rounded-xl shadow-lg overflow-hidden`}
      >
        <AppImage source={item.image} style={tw`w-full h-40`} />
        <View style={tw`p-4 gap-y-2`}>
          <Text style={tw`text-lg font-semibold text-gray-800`}>{item.propertyTitle}</Text>
          <Text style={tw`text-gray-500`}>{item.location}</Text>
          <View style={tw`p-2 rounded-lg bg-yellow-100 overflow-hidden mr-auto`}>
            <Text style={tw`text-sm text-yellow-700`}> {item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  },
  (prev, next) => prev?.item?.id === next?.item?.id
)
