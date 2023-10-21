/*
 * @Author: kim
 * @Date: 2023-07-22 10:28:32
 * @Description: 头像卡片
 */
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { shallow } from 'zustand/shallow'
import { useLogout } from '@/hooks'
import { motion } from 'framer-motion'
import { fadeVariants } from '@/helpers/variants'
import ThemeSwap from '@/components/shared/theme-swap'
import Avatar from '@/components/shared/avatar'
import { useUserStore } from '@/store/useUserStore'

export interface AvatarCardProps {
  className?: string
  collapsed?: boolean // 是否收起
  onSearch?: () => void
}

function AvatarCard(props: AvatarCardProps) {
  const { className, collapsed = false, onSearch } = props
  const navigate = useNavigate()
  const { setToken, userInfo } = useUserStore(
    (state) => ({ setToken: state.setToken, userInfo: state.userInfo }),
    shallow,
  )
  const { show: showLogoutConfirm } = useLogout(() => {
    setToken('')
    navigate('/login')
  })

  const classes = useMemo(() => {
    const classArr = []

    if (collapsed) {
      classArr.push('pt-4')
    } else {
      classArr.push('p-4 pb-0')
    }

    if (className) {
      classArr.push(className)
    }

    return classArr.join(' ')
  }, [className, collapsed])

  return (
    <div className={classes}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
        <div className="shrink-0">
          <Avatar
            className={collapsed ? 'w-6' : ''}
            url={userInfo?.avatar}
            name={userInfo?.name}
          />
        </div>
        {!collapsed && (
          <div className="grow truncate pl-2 text-lg">{userInfo?.name}</div>
        )}
      </div>

      {/* 搜索按钮 start */}
      {collapsed && (
        <motion.button
          variants={fadeVariants}
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
          className={`daisy-btn daisy-btn-ghost daisy-btn-sm mt-3 border-0`}
          onClick={onSearch}
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </motion.button>
      )}
      {/* 搜索按钮 end */}

      <div
        className={`mt-3 flex items-center ${
          collapsed ? 'flex-col space-y-3' : 'justify-between'
        }`}
      >
        {/* 暗黑模式 */}
        <ThemeSwap
          className="daisy-btn daisy-btn-ghost daisy-btn-sm"
          iconClassName="h-6 w-6"
        />

        {/* 设置 */}
        <div
          className="sm:daisy-tooltip sm:daisy-tooltip-bottom"
          data-tip="设置"
        >
          <button
            className="daisy-btn daisy-btn-ghost daisy-btn-sm border-0"
          >
            <Cog6ToothIcon className="h-6 w-6" />
          </button>
        </div>

        {/* 退出登录 */}
        <div
          className="sm:daisy-tooltip sm:daisy-tooltip-bottom"
          data-tip="退出登录"
        >
          <button
            className="daisy-btn daisy-btn-ghost daisy-btn-sm border-0"
            onClick={showLogoutConfirm}
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* 搜索框 start */}
      {!collapsed && (
        <motion.div
          variants={fadeVariants}
          initial={false}
          animate="fadeIn"
          exit="fadeOut"
          className="mt-2 hidden md:block"
        >
          <div
            className="flex h-12 w-full cursor-pointer items-center rounded-lg bg-base-200 px-3"
            onClick={onSearch}
          >
            <MagnifyingGlassIcon className=" h-6 w-6 shrink-0" />
            <div className="grow pl-2 text-base-content/50">
              搜索任务 / 项目
            </div>
            <div className="shrink-0 space-x-1 opacity-50">
              <kbd className="daisy-kbd daisy-kbd-sm">⌘</kbd>
              <kbd className="daisy-kbd daisy-kbd-sm">K</kbd>
            </div>
          </div>
        </motion.div>
      )}
      {/* 搜索框 end */}
    </div>
  )
}

export default AvatarCard
