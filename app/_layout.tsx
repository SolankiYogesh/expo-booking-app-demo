import 'react-native-reanimated'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useFonts} from 'expo-font'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const client = new QueryClient()
export default () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <QueryClientProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="details/[id]" options={{headerShown: false}} />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  )
}
