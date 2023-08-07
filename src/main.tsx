import React, { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import '@/assets/styles/globals.scss'
import router from '@/routes'
import { useGlobalStore } from '@/store/useGlobalStore'
import { lightToken, darkToken } from '@/helpers/antd-theme'

function App() {
  const { setTheme, themeValue } = useGlobalStore(
    (state) => ({ setTheme: state.setTheme, themeValue: state.theme }),
    shallow,
  )
  
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // 当前系统主题为暗黑模式
      document.documentElement.dataset.theme = 'dark'
      setTheme('dark')
    } else {
      // 当前系统主题为明亮模式
      document.documentElement.dataset.theme = 'light'
      setTheme('light')
    }
  }, [])

  const antdTheme = useMemo(() => {
    if (themeValue === 'light') {
      return {
        algorithm: theme.defaultAlgorithm,
        token: lightToken,
      }
    } else {
      return {
        algorithm: theme.darkAlgorithm,
        token: darkToken,
      }
    }
  }, [themeValue])

  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
