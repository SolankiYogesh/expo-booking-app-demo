import {ActivityIndicator, View} from 'react-native'

import Colors from '@/constants/Colors'
import tw from '@/helper/tw'

export default () => {
  return (
    <View style={tw`flex flex-1 items-center justify-center`}>
      <ActivityIndicator color={Colors.primary} />
    </View>
  )
}
