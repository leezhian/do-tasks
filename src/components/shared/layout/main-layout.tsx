/*
 * @Author: kim
 * @Date: 2023-07-21 00:23:10
 * @Description: 主要布局
 */
import { Outlet } from 'react-router-dom'
import Menu from '@/components/shared/menu'

function Layout() {
  return (
    <>
      <Menu />
      <div className="grow overflow-hidden md:min-h-screen">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
