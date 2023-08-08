import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/shared/layout/main-layout'
import Home from '@/views/home'
import Login from '@/views/login'
import Project from '@/views/project'
import AuthGuard from '@/helpers/auth.guard'

const AuthMainLayout = AuthGuard(MainLayout)
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthMainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/project/:id',
        element: <Project />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
