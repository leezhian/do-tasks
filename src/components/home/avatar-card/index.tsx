/*
 * @Author: kim
 * @Date: 2023-07-22 10:28:32
 * @Description: 头像卡片
 */
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { useLogout } from '@/hooks'
import ThemeSwap from '@/components/shared/theme-swap'

export interface AvatarCardProps {
  className?: string
}

function AvatarCard(props: AvatarCardProps) {
  const { className } = props
  const navigate = useNavigate()
  const { show: showLogoutConfirm, logoutModal } = useLogout(() => {
    // TODO remove token
    navigate('/login')
  })

  const classes = useMemo(() => {
    const classArr = ['p-4 pb-0']

    if (className) {
      classArr.push(className)
    }

    return classArr.join(' ')
  }, [className])

  return (
    <div className={classes}>
      <div className="flex items-center">
        <div className="avatar placeholder shrink-0">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-xs">靓</span>
          </div>
        </div>
        <div className="grow truncate pl-2 text-lg">即将暴富的靓仔</div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <ThemeSwap className="btn btn-ghost btn-sm" iconClassName="h-6 w-6" />

        <div className="indicator sm:tooltip sm:tooltip-bottom" data-tip="通知">
          <span className="badge indicator-item badge-secondary right-3 top-1 h-2 w-2 p-0"></span>
          <button className="btn btn-ghost btn-sm">
            <BellIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="sm:tooltip sm:tooltip-bottom" data-tip="退出登录">
          <button className="btn btn-ghost btn-sm" onClick={showLogoutConfirm}>
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {logoutModal}
    </div>
  )
}

export default AvatarCard
