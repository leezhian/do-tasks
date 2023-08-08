/*
 * @Author: kim
 * @Date: 2023-08-08 11:48:09
 * @Description: 鉴权守卫
 */
import { useEffect } from 'react'
import type { ComponentType } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/useUserStore'
import { shallow } from 'zustand/shallow'
import { _get } from '@/helpers/request'
import type { UserInfo } from '@/views/login/service'

export interface AuthGuard<P = {}, CP = P> {
  (Component: ComponentType<CP>): ComponentType<P>
}

const AuthGuard: AuthGuard = (Component) => (props) => {
  const navigate = useNavigate()
  const { token, setUserInfo } = useUserStore(state => ({ token: state.token, setUserInfo: state.setUserInfo }), shallow)

  const fetchUserInfo = async () => {
    return _get<UserInfo>('/user/info')
  }

  useEffect(() => {
    if (!token) {
      navigate('/login', {
        replace: true
      })
    } else {
      fetchUserInfo().then(res => {
        setUserInfo(res)
      })
    }
  }, [token])

  return <Component {...props} />
}

export default AuthGuard