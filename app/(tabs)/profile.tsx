import {ScrollView, Text} from 'react-native'

import AppContainer from '@/components/AppContainer'
import AppImage from '@/components/AppImage'
import tw from '@/helper/tw'
import useUserStore from '@/store/useUserStore'

export default () => {
  const userData = useUserStore((state) => state.userData)

  return (
    <AppContainer>
      <ScrollView style={tw`flex-1 bg-white`} contentContainerStyle={tw`items-center py-10`}>
        <AppImage
          source={`https://picsum.photos/seed/${userData?.id}/150`}
          style={tw`w-36 h-36 rounded-full mb-6 overflow-hidden`}
        />
        <Text style={tw`text-xl font-bold text-gray-900 mb-1`}>{userData?.name}</Text>
        <Text style={tw`text-sm text-gray-600 mb-4`}>{userData?.email}</Text>
      </ScrollView>
    </AppContainer>
  )
}
