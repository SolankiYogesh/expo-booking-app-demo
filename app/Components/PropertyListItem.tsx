import {useRouter} from 'expo-router'
import {memo} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import tw from 'twrnc'

import AppImage from '@/components/AppImage'
import type {PropertyType} from '@/types'

type Props = {
  item: PropertyType
}
export default memo(
  ({item}: Props) => {
    const router = useRouter()
    return (
      <TouchableOpacity
        onPress={() => router.navigate(`/details/${item.id}`)}
        style={tw`w-full rounded-xl overflow-hidden shadow-sm bg-white`}
      >
        <AppImage style={tw`w-full h-48`} source={item.images[0]} />
        <View style={tw`p-3 gap-y-1`}>
          <Text style={tw`font-semibold text-black`}>{item.title}</Text>
          <Text style={tw`font-medium text-gray-800`}>{item.location.city}</Text>
          <Text style={tw`font-medium text-gray-400`}>${item.price} / Night</Text>
        </View>
      </TouchableOpacity>
    )
  },
  (prev, next) => prev?.item?.id === next?.item?.id
)
