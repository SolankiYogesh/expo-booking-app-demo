import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {useEffect, useMemo, useState} from 'react'
import {FlatList, InteractionManager} from 'react-native'
import {style} from 'twrnc'

import {endpoints} from '@/api'
import AppContainer from '@/components/AppContainer'
import EmptyView from '@/components/EmptyView'
import LoadingView from '@/components/LoadingView'
import tw from '@/helper/tw'
import type {PropertyType} from '@/types'

import PropertyListItem from '../Components/PropertyListItem'
import SearchInput from '../Components/SearchInput'

export default () => {
  const [search, setSearch] = useState('')
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['property'],
    enabled: false,
    queryFn: async () => await axios.get<PropertyType[]>(endpoints.properties)
  })

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      refetch()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listData = useMemo(
    () =>
      (data?.data ?? [])?.filter((i) =>
        i?.title?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())
      ),
    [data?.data, search]
  )

  return (
    <AppContainer>
      <FlatList
        ListHeaderComponent={<SearchInput value={search} onChangeText={setSearch} />}
        ListEmptyComponent={isLoading ? <LoadingView /> : <EmptyView />}
        data={listData ?? []}
        contentContainerStyle={[
          tw`p-3 gap-y-2`,
          style((isLoading || listData.length === 0) && 'flex-1')
        ]}
        renderItem={({item}) => <PropertyListItem item={item} />}
        keyExtractor={(i) => i?.id}
      />
    </AppContainer>
  )
}
