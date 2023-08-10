/*
 * @Author: kim
 * @Date: 2023-07-23 01:36:19
 * @Description:
 */
import type { MouseEvent } from 'react'
import { ProjectStatus } from '@/helpers/enum'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import CircleProgress from '@/components/shared/circle-progress'

export interface ProjectCardProps {
  className?: string
  dataSource?: any
  onClick?: () => void
  onDropdownClick?: (name: 'archive' | 'unarchive' | 'delete', item: any) => void
}

function ProjectCard(props: ProjectCardProps) {
  const { className, dataSource, onClick, onDropdownClick } = props

  const handleDropdownClick = (e: MouseEvent<HTMLAnchorElement>, name: 'archive' | 'unarchive' | 'delete') => {
    e.stopPropagation()
    onDropdownClick && onDropdownClick(name, dataSource)
  }

  return (
    <div
      className={`min-w-64 daisy-card w-64 cursor-pointer bg-base-100 shadow-xl ${className}`}
      onClick={onClick}
    >
      <div className="bg-hero relative rounded-bl-unset rounded-br-unset rounded-tl-inherit rounded-tr-inherit px-4 py-2">
        {/* 卡片菜单栏 start */}
        <div className="-mr-2 mb-2 flex items-center justify-between text-xs">
          <div className="flex items-center">
            <div className="daisy-badge daisy-badge-info h-1.5 px-0.5"></div>
            <span className="ml-1">进行中</span>
          </div>

          {/* 下拉菜单 start */}
          <div className="daisy-dropdown daisy-dropdown-end">
            <label
              tabIndex={0}
              className="daisy-btn daisy-btn-ghost daisy-btn-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </label>
            <ul
              tabIndex={0}
              className="daisy-menu daisy-dropdown-content z-[1] w-20 rounded-lg bg-base-100 p-1 text-xs shadow"
            >
              <li>
                <a className="rounded px-2 py-1.5" onClick={(e) => handleDropdownClick(e, dataSource.status === ProjectStatus.Active ? 'archive' : 'unarchive')}>{ dataSource.status === ProjectStatus.Active ? '归档' : '取消归档'}</a>
              </li>
              <li>
                <a className="rounded px-2 py-1.5 text-error hover:text-error" onClick={(e) => handleDropdownClick(e, 'delete')}>
                  删除项目
                </a>
              </li>
            </ul>
          </div>
          {/* 下拉菜单 end */}
        </div>
        {/* 卡片菜单栏 end */}
        {/* 项目名称 */}
        <div className="daisy-card-title block truncate text-base">
          {dataSource?.name}
        </div>
      </div>

      {/* 项目数据 start */}
      <div className="daisy-card-body flex-row p-4">
        <CircleProgress className="shrink-0" percent={50} secPercent={10} />
        <div className="flex grow flex-col items-end">
          <table className="text-right text-xs">
            <tbody>
              <tr className="text-accent-content">
                <td className="font-medium">任务总数：</td>
                <td>1000</td>
              </tr>
              <tr className="text-success">
                <td className="font-medium">准时完成：</td>
                <td>800</td>
              </tr>
              <tr className="text-error">
                <td className="font-medium">逾期完成：</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-auto text-xs text-base-content/40">
            创建于2023-07-21
          </div>
        </div>
      </div>
      {/* 项目数据 end */}
    </div>
  )
}

export default ProjectCard
