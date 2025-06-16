import React, {memo} from 'react'
import {StatusBar, type StyleProp, StyleSheet, View, type ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'

type AppContainerProps = {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  isSafeArea?: boolean
  paddingHorizontal?: number
  isTopSafeStyle?: boolean
}

export default memo(
  ({
    children,
    isSafeArea = true,
    style = {},
    paddingHorizontal = 0,
    isTopSafeStyle = false
  }: AppContainerProps) => {
    const {bottom, top} = useSafeAreaInsets()

    const topSafeStyle = {
      paddingTop: top
    }

    return (
      <View
        style={[
          styles.container,
          {paddingHorizontal},
          isTopSafeStyle && topSafeStyle,
          isSafeArea && {
            paddingTop: top,
            paddingBottom: bottom
          },
          style
        ]}
      >
        <StatusBar animated backgroundColor={Colors.white} barStyle={'dark-content'} />
        {children}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  }
})
