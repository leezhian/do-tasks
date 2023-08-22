/*
 * @Author: kim
 * @Date: 2023-08-22 15:59:50
 * @Description: 导航栏右侧按钮组
 */
import { useCallback } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { ProjectStatus } from '@/helpers/enum'

export interface NavRightBtnGroupProps {
  dataSource?: any
  onSettingProject?: (type: string) => void
  onCreateTask?: () => void
}

function NavRightBtnGroup({
  onCreateTask,
  onSettingProject,
  dataSource,
}: NavRightBtnGroupProps) {
  const handleDropdownClick = useCallback(
    (type: string) => {
      onSettingProject && onSettingProject(type)
    },
    [onSettingProject],
  )

  return (
    <div>
      <div className="flex items-center space-x-2">
        <div className="daisy-dropdown daisy-dropdown-end">
          <label
            tabIndex={0}
            className="daisy-btn daisy-btn-ghost daisy-btn-sm"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="daisy-menu daisy-dropdown-content z-[1] w-20 rounded-lg bg-base-100 p-1 text-xs shadow"
          >
            <li>
              <a
                className="rounded px-2 py-1.5"
                onClick={() => handleDropdownClick('update')}
              >
                修改项目
              </a>
            </li>
            <li>
              <a
                className="rounded px-2 py-1.5"
                onClick={() =>
                  handleDropdownClick(
                    dataSource?.status === ProjectStatus.Active
                      ? 'archive'
                      : 'unarchive',
                  )
                }
              >
                {dataSource?.status === ProjectStatus.Active
                  ? '归档'
                  : '取消归档'}
              </a>
            </li>
          </ul>
        </div>
        <button
          className="daisy-btn daisy-btn-primary daisy-btn-sm"
          onClick={onCreateTask}
        >
          新增任务
        </button>
      </div>
    </div>
  )
}

export default NavRightBtnGroup
