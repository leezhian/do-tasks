/*
 * @Author: kim
 * @Date: 2023-08-08 13:20:42
 * @Description: 用户信息
 */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { localStorage } from '@/helpers/storage'
import { TOKEN_KEY, USER_INFO_KEY } from '@/helpers/config'
import type { UserInfo } from '@/views/login/service'

export interface UserStore {
  token?: string
  userInfo?: Partial<UserInfo>
  setToken: (token: string) => void
  setUserInfo: (userInfo: UserInfo) => void
}

export const useUserStore = create(devtools<UserStore>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => {
    set({ token })
    if (!token) {
      localStorage.removeItem(TOKEN_KEY)
      return
    }
    localStorage.setItem(TOKEN_KEY, token)
  },
  setUserInfo: (userInfo: Partial<UserInfo>) => {
    set({ userInfo })
    localStorage.setItem(USER_INFO_KEY, userInfo)
  }
}), {
  name: 'userStore',
  enabled: import.meta.env.DEV
}))
