/*
 * @Author: kim
 * @Date: 2023-08-07 23:23:02
 * @Description: 全局状态管理
 */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface GlobalStore {
  theme: string
  setTheme: (theme: string) => void
}

export const useGlobalStore = create(devtools<GlobalStore>((set, get) => ({
  theme: 'light',
  setTheme: (theme: string) => set({ theme }),
}), { name: 'globalStore', enabled: import.meta.env.DEV }))