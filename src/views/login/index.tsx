import { useState, useCallback, memo } from 'react'
import type { FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { useRequest } from 'ahooks'
import { shallow } from 'zustand/shallow'
import { useUserStore } from '@/store/useUserStore'
import ThemeSwap from '@/components/shared/theme-swap'
import EyeSwap from '@/components/login/eye-swap'
import toast from '@/components/shared/toast'
import { fetchLogin } from './service'
import {
  validate,
  isPhone,
  isNotEmpty,
  minLength,
  maxLength,
} from '@/helpers/validator'

const Login = memo(() => {
  const [showPwd, setShowPwd] = useState(false)
  const navigate = useNavigate()
  const { runAsync: login, loading } = useRequest(fetchLogin, { manual: true })
  const { setToken, setUserInfo } = useUserStore(state => ({ setToken: state.setToken, setUserInfo: state.setUserInfo }), shallow)
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('') // 手机号错误信息
  const [pwdErrorMsg, setPwdErrorMsg] = useState('') // 密码错误信息

  const handlePwdTypeChange = useCallback((checked: boolean) => {
    setShowPwd(checked)
  }, [])

  // 重置错误信息
  const resetPhoneErrMsg = useCallback(() => {
    setPhoneErrorMsg('')
  }, [])
  const resetPwdErrMsg = useCallback(() => {
    setPwdErrorMsg('')
  }, [])

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      if (loading) return
      const formData = new FormData(e.currentTarget)
      const phone = formData.get('phone') as string
      const password = formData.get('password') as string
      const phoneErrorMsg = validate(phone, [isPhone()])

      const pwdErrorMsg = validate(password, [
        isNotEmpty('密码不允许为空'),
        minLength(8, '密码长度不允许小于8位'),
        maxLength(16, '密码长度不允许大于16位'),
      ])
      if (phoneErrorMsg || pwdErrorMsg) {
        setPhoneErrorMsg(phoneErrorMsg)
        setPwdErrorMsg(pwdErrorMsg)
        return
      }

      const res = await login(phone, password)
      setToken(res.token)
      setUserInfo(omit(res, ['token']))
      navigate('/')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-hero daisy-hero min-h-screen">
      <div className="absolute right-6 top-6">
        <ThemeSwap iconClassName="h-4 w-4" />
      </div>
      <div className="daisy-hero-content relative w-full flex-col p-6 lg:flex-row">
        <div className="bg-square absolute left-0 hidden h-[400px] w-[400px] opacity-60 lg:block"></div>
        <div className="relative flex-grow text-center lg:pl-10 lg:text-left">
          <h1 className="text-5xl font-bold">Do Tasks</h1>
          <p className="py-6 text-2xl">简单好用的任务协同工具</p>
        </div>
        <div className="daisy-card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
          <form onSubmit={handleLogin}>
            <div className="daisy-card-body">
              <div className="daisy-form-control">
                <label className="daisy-label">
                  <span className="daisy-label-text">手机号</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="输入手机号码"
                  className={`daisy-input daisy-input-bordered ${
                    phoneErrorMsg ? 'daisy-input-error' : ''
                  }`}
                  onChange={resetPhoneErrMsg}
                />
                {!!phoneErrorMsg && (
                  <p className="mt-1 text-xs text-error">{phoneErrorMsg}</p>
                )}
              </div>
              <div className="daisy-form-control">
                <label className="daisy-label">
                  <span className="daisy-label-text">密码</span>
                </label>
                <div className="daisy-form-control relative">
                  <input
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    placeholder="输入密码"
                    maxLength={16}
                    className={`daisy-input daisy-input-bordered ${
                      pwdErrorMsg ? 'daisy-input-error' : ''
                    }`}
                    onChange={resetPwdErrMsg}
                  />
                  <EyeSwap
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onChange={handlePwdTypeChange}
                  />
                </div>
                {!!pwdErrorMsg && (
                  <p className="mt-1 text-xs text-error">{pwdErrorMsg}</p>
                )}

                {/* <label className='label'>
                <a href='#' className='label-text-alt link link-hover'>
                  Forgot password?
                </a>
              </label> */}
              </div>
              <div className="daisy-form-control mt-6">
                <button
                  className="daisy-btn daisy-btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <span className="daisy-oading-spinner daisy-loading daisy-loading-sm"></span>
                  )}
                  登录 / 注册
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})

export default Login
