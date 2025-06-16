import AntDesign from '@expo/vector-icons/AntDesign'
import {memo} from 'react'
import type {TextInputProps} from 'react-native'
import {TextInput, View} from 'react-native'

import Colors from '@/constants/Colors'
import tw from '@/helper/tw'

export default memo((rest: TextInputProps) => {
  return (
    <View
      style={tw`flex-1 flex-row items-center border bg-white rounded-3xl border-[${Colors.primary}] overflow-hidden pl-2 gap-x-3 min-h-10`}
    >
      <AntDesign name="search1" size={24} color={Colors.primary} />
      <TextInput
        {...rest}
        style={tw`flex-1  h-full`}
        placeholder="Search..."
        returnKeyType="search"
      />
    </View>
  )
})
