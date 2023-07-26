import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeSwap from '@/components/shared/theme-swap'
import EyeSwap from '@/components/login/eye-swap'
import toast from '@/components/shared/toast'


function Login() {
  const [showPwd, setShowPwd] = useState(false)
  const navigate = useNavigate()

  const handlePwdTypeChange = useCallback((checked: boolean) => {
    setShowPwd(checked)
  }, [])

  const handleLogin = () => {
    toast.success('登录成功')
    navigate('/')
  }

  return (
    <div className="bg-hero daisy-hero min-h-screen">
      <div className="absolute right-6 top-6">
        <ThemeSwap iconClassName="h-4 w-4" />
      </div>
      <div className="daisy-hero-content relative w-full flex-col p-6 lg:flex-row">
        <div className="bg-square absolute left-0 hidden h-[400px] w-[400px] opacity-60 lg:block"></div>
        <div className="relative flex-grow text-center lg:pl-10 lg:text-left">
          <h1 className="text-5xl font-bold">Task Work</h1>
          <p className="py-6 text-2xl">简单好用的任务协同工具</p>
        </div>
        <div className="daisy-card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
          <div className="daisy-card-body">
            <div className="daisy-form-control">
              <label className="daisy-label">
                <span className="daisy-label-text">手机号</span>
              </label>
              <input
                type="tel"
                placeholder="输入手机号码"
                className="daisy-input daisy-input-bordered"
              />
            </div>
            <div className="daisy-form-control">
              <label className="daisy-label">
                <span className="daisy-label-text">密码</span>
              </label>
              <div className="daisy-form-control relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="输入密码"
                  maxLength={16}
                  className="daisy-input daisy-input-bordered"
                />
                <EyeSwap
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onChange={handlePwdTypeChange}
                />
              </div>

              {/* <label className='label'>
                <a href='#' className='label-text-alt link link-hover'>
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="daisy-form-control mt-6">
              <button className="daisy-btn daisy-btn-primary" onClick={handleLogin}>登录 / 注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
