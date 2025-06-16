import React from 'react'
import {FlatList} from 'react-native'
import {style} from 'twrnc'

import AppContainer from '@/components/AppContainer'
import EmptyView from '@/components/EmptyView'
import {useBookingStore} from '@/store'

import BookingListItem from '../Components/BookingListItem'

export default () => {
  const booking = useBookingStore((state) => state.bookings)

  return (
    <AppContainer>
      <FlatList
        data={booking}
        keyExtractor={(item) => item.id}
        renderItem={({index, item}) => <BookingListItem index={index} item={item} />}
        ListEmptyComponent={<EmptyView />}
        contentContainerStyle={style(`pb-6`, booking.length === 0 && 'flex-1')}
      />
    </AppContainer>
  )
}
