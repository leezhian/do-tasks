/*
 * @Author: kim
 * @Date: 2023-07-28 22:09:57
 * @Description: 导航栏
 */
import type { ReactNode } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

interface NavBarProps {
  className?: string
  right?: ReactNode
}

function NavBar(props: NavBarProps) {
  const { right, className } = props

  return (
    <div className={`flex h-12 items-center justify-between ${className}`}>
      <button className="daisy-btn daisy-btn-ghost px-3 hover:bg-transparent">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      {!!right && <div className="pr-3">{right}</div>}
    </div>
  )
}

export default NavBar
