import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/shared/layout/main-layout'
import Home from '@/views/home'
import Login from '@/views/login'
import Task from '@/views/task'
import AuthGuard from '@/helpers/auth.guard'

const AuthMainLayout = AuthGuard(MainLayout)
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthMainLayout />,
    children: [
      {
        path: '/:teamId',
        element: <Home />
      },
      {
        path: '/:teamId/:projectId',
        element: <Task />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
