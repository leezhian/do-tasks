/*
 * @Author: kim
 * @Date: 2023-07-21 00:23:10
 * @Description: 主要布局
 */
import { Outlet } from 'react-router-dom'
import Menu from '@/components/home/menu'

function Layout() {
  return (
    <>
      <Menu />
      <div className=" md:min-h-screen grow">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
