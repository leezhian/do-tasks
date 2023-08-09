/*
 * @Author: kim
 * @Date: 2023-08-07 23:23:02
 * @Description: 全局状态管理
 */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface GlobalStore {
  theme: string
  activeTeamId: string
  setTheme: (theme: string) => void
}

export const useGlobalStore = create(devtools<GlobalStore>((set, get) => ({
  theme: 'light',
  activeTeamId: '',
  setTheme: (theme: string) => set({ theme }),
  setActiveTeamId: (activeTeamId: string) => set({ activeTeamId })
}), { name: 'globalStore', enabled: import.meta.env.DEV }))