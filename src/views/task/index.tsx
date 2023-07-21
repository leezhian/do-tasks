import ThemeSwap from '@/components/shared/theme-swap'
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import TeamList from '@/components/task/team-list/intex'

function Task() {
  return (
    <div className="flex h-screen w-60 flex-col border-r border-base-content border-opacity-10 p-4">
      <div className="shrink-0">
        <div className="flex items-center ">
          <div className="avatar placeholder shrink-0">
            <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
              <span className="text-xs">AA</span>
            </div>
          </div>
          <div className="grow pl-2 text-lg">AAAAAAA</div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <ThemeSwap className="btn btn-ghost btn-sm" iconClassName="h-6 w-6" />

          <div className="indicator">
            <span className="badge indicator-item badge-secondary right-3 top-1 h-2 w-2 p-0"></span>
            <button className="btn btn-ghost btn-sm">
              <BellIcon className="h-6 w-6" />
            </button>
          </div>

          <button className="btn btn-ghost btn-sm">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="divider before:h-px after:h-px"></div>

      <div className="flex grow flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between font-semibold">
          <h3 className="font-semibold">团队</h3>
          <button className="btn btn-ghost btn-xs">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="grow overflow-y-scroll">
          <TeamList />
        </div>
      </div>
    </div>
  )
}

export default Task
