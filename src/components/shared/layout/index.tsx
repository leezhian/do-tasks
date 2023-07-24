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
