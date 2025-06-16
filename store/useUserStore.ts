import {create} from 'zustand'

import type {UserProfile} from '@/types'

export type UserStore = {
  userData: UserProfile | null
  setUserData: (data: UserProfile) => void
}

export default create<UserStore>((set) => ({
  userData: null,
  setUserData: (data) =>
    set((state) => {
      return {
        userData: {...(state.userData ?? {}), ...data}
      }
    })
}))
