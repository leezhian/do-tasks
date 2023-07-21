import { createBrowserRouter } from 'react-router-dom'
import Task from '@/views/task'
import Login from '@/views/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Task />
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router