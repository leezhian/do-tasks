/*
 * @Author: kim
 * @Date: 2023-07-23 01:36:19
 * @Description: 
 */
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import CircleProgress from '@/components/shared/circle-progress'

export interface ProjectCardProps {
  className?: string
  dataSource?: Record<string, any>
}

function ProjectCard(props: ProjectCardProps) {
  const { className, dataSource } = props

  return <div className={`card min-w-64 w-64 bg-base-100 shadow-xl cursor-pointer ${className}`}>
    <div className="relative rounded-bl-unset rounded-br-unset rounded-tl-inherit rounded-tr-inherit bg-hero px-4 py-2">
      {/* 卡片菜单栏 start */}
      <div className='text-xs flex items-center justify-between -mr-2 mb-2'>
        <div className='flex items-center'>
          <div className="badge badge-info h-1.5 px-0.5"></div>
          <span className='ml-1'>进行中</span>
        </div>

        {/* 下拉菜单 start */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-xs"><EllipsisHorizontalIcon className='w-4 h-4' /></label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu px-0 shadow bg-base-100 w-20 text-xs rounded-lg">
            <li><a className='px-2 py-1 rounded-none'>归档</a></li>
            <li><a className='px-2 py-1 text-error hover:text-error rounded-none'>删除项目</a></li>
          </ul>
        </div>
        {/* 下拉菜单 end */}
      </div>
      {/* 卡片菜单栏 end */}
      {/* 项目名称 */}
      <div className="block card-title text-base truncate">{dataSource?.name}</div>
    </div>

    {/* 项目数据 start */}
    <div className="card-body p-4 flex-row">
      <CircleProgress className='shrink-0' percent={50} secPercent={10} />
      <div className='grow flex flex-col items-end'>
        <table className='text-xs text-right'>
          <tbody>
            <tr className='text-accent-content'>
              <td className='font-medium'>任务总数：</td>
              <td>1000</td>
            </tr>
            <tr className='text-success'>
              <td className='font-medium'>准时完成：</td>
              <td>800</td>
            </tr>
            <tr className='text-error'>
              <td className='font-medium'>逾期完成：</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>

        <div className='mt-auto text-xs text-base-content/40'>创建于2023-07-21</div>
      </div>
    </div>
    {/* 项目数据 end */}
  </div>
}

export default ProjectCard