import {Image, type ImageProps, type ImageStyle} from 'expo-image'
import React, {memo, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import tw from 'twrnc'

type Props = {
  imageStyle?: ImageStyle
} & ImageProps

export default memo(({imageStyle, style, ...rest}: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <View style={style}>
      {isLoading && (
        <View style={[StyleSheet.absoluteFillObject, tw`items-center justify-center`]}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      )}
      <Image
        {...rest}
        cachePolicy={'memory-disk'}
        style={[tw`size-full`, imageStyle]}
        onError={() => setIsLoading(false)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  )
})
