/*
 * @Author: kim
 * @Date: 2023-07-22 10:22:43
 * @Description: 菜单
 */
import { useState, useEffect } from 'react'
import {
  PlusIcon,
  Bars2Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { useResize } from '@/hooks'
import AvatarCard from '@/components/home/avatar-card'
import FixedSearch from '@/components/shared/search-input/fixed-search'
import TeamList from '@/components/home/team-list/intex'
import { setBodyOverflow } from '@/utils/utils'

export interface MenuProps {
  className?: string
}

function Menu() {
  const [showMenu, setShowMenu] = useState(false) // 是否显示菜单，pc必是true
  const [showSearch, setShowSearch] = useState(false) // 是否显示搜索框
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false) // 是否挂载移动端

  useResize((e) => {
    const { innerWidth } = e.target as Window
    const prevMobileMenuMounted = mobileMenuMounted
    const prevShowMenu = showMenu

    if (innerWidth >= 768) {
      if (prevMobileMenuMounted && prevShowMenu) {
        setBodyOverflow(false)
      }

      if (!prevShowMenu) {
        setShowMenu(true)
      }
    } else {
      if (!prevMobileMenuMounted) {
        setShowMenu(false)
      }
    }
    setMobileMenuMounted(innerWidth < 768)
  })

  // 768以下 打开menu 禁止页面滚动
  useEffect(() => {
    const documentWidth = document.documentElement.offsetWidth
    setBodyOverflow(showMenu && documentWidth < 768)
  }, [showMenu])

  const handleSearchItemClick = (item: any) => {
    console.log(item)
    setShowSearch(false)
  }

  const toggleSearchShow = (show: boolean) => {
    setShowSearch(show)
  }

  // 切换菜单显示
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <div className="relative hidden h-screen w-60 shrink-0 md:block"></div>
      {/* menu start */}
      <div
        className={`fixed left-0 top-0 z-30 h-screen w-full flex-col border-r border-base-content border-opacity-10 bg-base-100 pt-12 md:w-60 md:pt-0 ${
          showMenu ? 'flex' : 'hidden'
        }`}
      >
        <AvatarCard className="shrink-0" />
        <div className="daisy-divider mx-4 before:h-px after:h-px"></div>

        {/* 搜索框 start */}
        <div className="hidden p-4 pt-0 md:block" onClick={() => toggleSearchShow(true)}>
          <div className="flex h-12 w-full cursor-pointer items-center rounded-lg bg-base-200 px-3">
            <MagnifyingGlassIcon className=" h-6 w-6 shrink-0" />
            <div className="grow pl-2 text-base-content/50">
              搜索任务 / 团队
            </div>
            <div className="shrink-0 space-x-1 opacity-50">
              <kbd className="daisy-kbd daisy-kbd-sm">⌘</kbd>
              <kbd className="daisy-kbd daisy-kbd-sm">K</kbd>
            </div>
          </div>
        </div>
        {/* 搜索框 end */}

        <div className="flex grow flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between px-4 font-semibold">
            <h3 className="text-base font-semibold">团队</h3>
            <div className="sm:tooltip sm:tooltip-bottom" data-tip="创建团队">
              <button className="daisy-btn daisy-btn-ghost daisy-btn-xs">
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 grow overflow-y-scroll scroll-smooth p-2 pt-0">
            <TeamList />
          </div>
        </div>
      </div>
      {/* menu end */}

      {/* 移动端navbar start */}
      {mobileMenuMounted && (
        <div className="sticky left-0 right-0 top-0 z-50 flex h-12 w-full justify-between bg-base-100 md:hidden">
          {/* 搜索按钮 start */}
          <button
            className={`daisy-btn daisy-btn-ghost justify-start hover:bg-transparent ${
              showMenu ? 'pointer-events-none invisible' : ''
            }`}
            onClick={() => toggleSearchShow(true)}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          {/* 搜索按钮 end */}

          {/* 菜单图标 start */}
          <label className="daisy-btn daisy-btn-circle daisy-btn-ghost daisy-swap daisy-swap-rotate justify-items-end hover:bg-transparent">
            <input type="checkbox" checked={showMenu} onChange={toggleMenu} />
            <XMarkIcon className="daisy-swap-on h-6 w-6 fill-current" />
            <Bars2Icon className="daisy-swap-off h-6 w-6 fill-current" />
          </label>
          {/* 菜单图标 end */}
        </div>
      )}

      <FixedSearch show={showSearch} onSearchItem={handleSearchItemClick} onShowChange={toggleSearchShow} />
    </>
  )
}

export default Menu
