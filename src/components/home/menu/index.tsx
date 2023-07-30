/*
 * @Author: kim
 * @Date: 2023-07-22 10:22:43
 * @Description: 菜单
 */
import { useState, useEffect } from 'react'
import {
  Bars2Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { useResize } from '@/hooks'
import AvatarCard from '@/components/home/avatar-card'
import FixedSearch from '@/components/shared/search-input/fixed-search'
import { motion } from 'framer-motion'
import { fadeVariants } from '@/helpers/variants'
import { useBodyOverflow } from '@/hooks'
import TeamList from '@/components/home/team-list/intex'
import { setBodyOverflow } from '@/utils/utils'

export interface MenuProps {
  className?: string
}

function Menu() {
  const [showMenu, setShowMenu] = useState(false) // 是否显示菜单，pc必是true
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false) // 是否挂载移动端
  const [menuCollapsed, setMenuCollapsed] = useState(false) // 菜单是否收起
  const [showSearch, setShowSearch] = useState(false) // 是否显示搜索框
  useBodyOverflow(mobileMenuMounted && showMenu)

  useResize((e) => {
    const { innerWidth } = e.target as Window
    const prevMobileMenuMounted = mobileMenuMounted
    const prevShowMenu = showMenu

    if (innerWidth >= 768) {
      // if (prevMobileMenuMounted && prevShowMenu) {
      //   setBodyOverflow(false)
      // }

      if (!prevShowMenu) {
        setShowMenu(true)
      }
    } else {
      if (!prevMobileMenuMounted) {
        setShowMenu(false)
      }

      setMenuCollapsed(false)
    }

    setMobileMenuMounted(innerWidth < 768)
  })

  // 768以下 打开menu 禁止页面滚动
  // useEffect(() => {
  //   const documentWidth = document.documentElement.offsetWidth
  //   setBodyOverflow(showMenu && documentWidth < 768)
  // }, [showMenu])

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

  const toggleMenuCollapsed = () => {
    setMenuCollapsed((mc) => !mc)
  }

  return (
    <>
      <div
        className={`relative hidden h-screen shrink-0 transition-all md:block ${
          menuCollapsed ? 'md:w-12' : 'md:w-60'
        }`}
      ></div>
      {/* menu start */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-full flex-col border-r border-base-content border-opacity-10 bg-base-100 pt-12 transition-all md:pt-0 ${
          showMenu ? 'flex' : 'hidden'
        } ${menuCollapsed ? 'md:w-12' : 'md:w-60'}`}
      >
        <AvatarCard className="shrink-0" collapsed={menuCollapsed} />
        <div className="daisy-divider mx-4 before:h-px after:h-px"></div>

        <div className="flex grow flex-col overflow-hidden">
          <motion.div
            variants={fadeVariants}
            initial={false}
            animate={menuCollapsed ? 'fadeOut' : 'fadeIn'}
            className="flex h-full flex-col overflow-hidden"
          >
            <TeamList />
          </motion.div>
        </div>

        {/* 展开图标 start */}
        <div className="shrink-0 hidden md:block">
          <label className="daisy-btn daisy-btn-ghost daisy-swap daisy-swap-rotate h-10 w-full cursor-pointer justify-start px-3 hover:bg-transparent">
            <input
              type="checkbox"
              checked={menuCollapsed}
              onChange={toggleMenuCollapsed}
            />
            <ChevronDoubleLeftIcon className="daisy-swap-off h-6 w-6" />
            <ChevronDoubleRightIcon className="daisy-swap-on h-6 w-6" />
          </label>
        </div>
        {/* 菜单图标 end */}
      </aside>
      {/* menu end */}

      {/* 移动端navbar start */}
      {mobileMenuMounted && (
        <div className="sticky left-0 right-0 top-0 z-50 flex h-12 w-full justify-between bg-base-100 md:hidden">
          {/* 菜单图标 start */}
          <label className="daisy-swap-rotate daisy-btn daisy-btn-ghost daisy-swap hover:bg-transparent">
            <input type="checkbox" checked={showMenu} onChange={toggleMenu} />
            <XMarkIcon className="daisy-swap-on h-6 w-6 fill-current" />
            <Bars2Icon className="daisy-swap-off h-6 w-6 fill-current" />
          </label>
          {/* 菜单图标 end */}

          {/* 搜索按钮 start */}
          <button
            className={`daisy-btn daisy-btn-ghost hover:bg-transparent ${
              showMenu ? 'pointer-events-none invisible' : ''
            }`}
            onClick={() => toggleSearchShow(true)}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          {/* 搜索按钮 end */}
        </div>
      )}

      <FixedSearch
        show={showSearch}
        onSearchItem={handleSearchItemClick}
        onShowChange={toggleSearchShow}
      />
    </>
  )
}

export default Menu
