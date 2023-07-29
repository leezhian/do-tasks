import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/shared/layout/main-layout'
import Home from '@/views/home'
import Login from '@/views/login'
import Project from '@/views/project'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
