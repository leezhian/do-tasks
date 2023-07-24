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
import SearchInput from '@/components/shared/search-input'
import TeamList from '@/components/home/team-list/intex'
import Mask from '@/components/shared/mask'
import { setBodyOverflow } from '@/utils/utils'

export interface MenuProps {
  className?: string
}

function Menu() {
  const [showMenu, setShowMenu] = useState(false) // 是否显示菜单，pc必是true
  const [showSearchBar, setShowSearchBar] = useState(false) // 是否显示搜索框（移动端）
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false) // 是否挂载移动端

  useResize((e) => {
    const { innerWidth } = e.target as Window
    const prevMobileMenuMounted = mobileMenuMounted
    const prevShowMenu = showMenu

    if (innerWidth >= 768) {
      if (prevMobileMenuMounted && prevShowMenu) {
        setBodyOverflow(false)
      }

      if (showSearchBar) {
        toggleSearchBar(false)
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
    toggleSearchBar(false)
  }

  // 切换菜单显示
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  // 控制搜索框显示（移动端）
  const toggleSearchBar = (show: boolean) => {
    setShowSearchBar(show)
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
        <div className="divider mx-4 before:h-px after:h-px"></div>

        {/* 搜索框 start */}
        <div className="hidden p-4 pt-0 md:block">
          <SearchInput onSearchItem={handleSearchItemClick} />
        </div>
        {/* 搜索框 end */}

        <div className="flex grow flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between px-4 font-semibold">
            <h3 className="text-base font-semibold">团队</h3>
            <div className="sm:tooltip sm:tooltip-bottom" data-tip="创建团队">
              <button className="btn btn-ghost btn-xs">
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
            className={`btn btn-ghost justify-start hover:bg-transparent ${
              showMenu ? 'pointer-events-none invisible' : ''
            }`}
            onClick={() => toggleSearchBar(true)}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          {/* 搜索按钮 end */}

          {/* 菜单图标 start */}
          <label className="btn btn-circle btn-ghost swap swap-rotate justify-items-end hover:bg-transparent">
            <input type="checkbox" checked={showMenu} onChange={toggleMenu} />
            <XMarkIcon className="swap-on h-6 w-6 fill-current" />
            <Bars2Icon className="swap-off h-6 w-6 fill-current" />
          </label>
          {/* 菜单图标 end */}
        </div>
      )}

      {mobileMenuMounted && (
        <Mask show={showSearchBar} onClick={() => toggleSearchBar(false)}>
          <SearchInput
            className="absolute top-9 m-auto w-10/12"
            onSearchItem={handleSearchItemClick}
          />
        </Mask>
      )}
      {/* 移动端navbar end */}
    </>
  )
}

export default Menu
