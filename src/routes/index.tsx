import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/shared/layout'
import Home from '@/views/home'
import Login from '@/views/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router