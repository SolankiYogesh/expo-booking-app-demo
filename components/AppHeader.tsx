import Ionicons from '@expo/vector-icons/Ionicons'
import {useRouter} from 'expo-router'
import {Text, TouchableOpacity, View} from 'react-native'

import tw from '@/helper/tw'

type Props = {
  title: string
}
export default ({title}: Props) => {
  const router = useRouter()
  return (
    <View style={tw`flex-row items-center justify-between bg-white py-3 shadow`}>
      <TouchableOpacity onPress={router.back} style={tw`pl-4 z-50`}>
        <Ionicons name="arrow-back" size={24} style={tw`text-black`} />
      </TouchableOpacity>

      <Text style={tw`text-lg font-bold text-black absolute z-[-1] text-center w-full `}>
        {title}
      </Text>
    </View>
  )
}
