import { useMemo } from 'react'
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import ThemeSwap from '@/components/shared/theme-swap'

export interface AvatarCardProps {
  className?: string
}

function AvatarCard(props: AvatarCardProps) {
  const { className } = props

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
        <div className="grow pl-2 text-lg truncate">即将暴富的靓仔</div>
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
          <button className="btn btn-ghost btn-sm">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarCard
