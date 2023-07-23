/*
 * @Author: kim
 * @Date: 2023-07-22 10:22:43
 * @Description: 菜单
 */
import { PlusIcon } from '@heroicons/react/24/outline'
import AvatarCard from '@/components/home/avatar-card'
import SearchInput from '@/components/shared/search-input'
import TeamList from '@/components/home/team-list/intex'

export interface MenuProps {
  className?: string
}

function Menu() {
  return (
    <>
      <div className="relative h-screen w-60 shrink-0"></div>
      <div className=" fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-base-content border-opacity-10">
        <AvatarCard className="shrink-0" />
        <div className="divider mx-4 before:h-px after:h-px"></div>

        <div className="p-4 pt-0">
          <SearchInput />
        </div>

        <div className="flex grow flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between px-4 font-semibold">
            <h3 className="font-semibold">团队</h3>
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
    </>
  )
}

export default Menu
