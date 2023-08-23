/*
 * @Author: kim
 * @Date: 2023-08-22 18:38:52
 * @Description:
 */
import { useMemo, useState } from 'react'
import { Drawer, Tag, DrawerProps } from 'antd'
import * as dayjs from 'dayjs'
import {
  PuzzlePieceIcon,
  ClockIcon,
  FlagIcon,
  UserIcon,
  UserGroupIcon,
  PaperClipIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from '@heroicons/react/24/outline'
import { useRequest } from 'ahooks'
import { _get } from '@/helpers/request'
import { TaskPriority, TaskStatus } from '@/helpers/enum'
import { priorityColorMap, taskStatusMap } from '@/components/task/task-table'
import Empty from '@/components/shared/empty'
import Avatar from '@/components/shared/avatar'
import PropertyList from '@/components/task/property-list'
import ContentEmpty from '@/assets/images/content-empty.png'

function fetchTaskContent(path: string) {
  if (!path) {
    return Promise.resolve('')
  }

  return _get<string>(path)
}
export interface TaskDetailDrawerProps extends DrawerProps {
  dataSource?: any
}

function TaskDetailDrawer(props: TaskDetailDrawerProps) {
  const { dataSource, ...restProps } = props
  const [fullScreen, setFullScreen] = useState(false)
  const { data: taskContentString } = useRequest(
    () => fetchTaskContent(dataSource?.content as string),
    {
      refreshDeps: [dataSource?.content],
    },
  )

  const owners = useMemo(() => {
    return (
      dataSource?.owners.map((item: any) => ({
        wrapperClassName: 'border-2',
        className: 'w-6',
        url: item.avatar,
        ...item,
      })) ?? []
    )
  }, [dataSource?.owners])

  return (
    <Drawer
      {...restProps}
      destroyOnClose
      placement="right"
      width={fullScreen ? '100vw' : '768px'}
      closeIcon={
        <span className="inline-block h-4 w-4 text-base-content">✕</span>
      }
      extra={
        <div className="flex items-center space-x-1">
          <label
            className="daisy-btn daisy-btn-ghost daisy-swap daisy-btn-sm"
            title="全屏"
          >
            <input
              type="checkbox"
              checked={fullScreen}
              onChange={() => setFullScreen(!fullScreen)}
            />
            <ArrowsPointingOutIcon className="daisy-swap-off h-4 w-4 fill-current" />
            <ArrowsPointingInIcon className="daisy-swap-on h-4 w-4 fill-current" />
          </label>
          <button className="daisy-btn daisy-btn-primary daisy-btn-sm">
            完成
          </button>
        </div>
      }
    >
      <h3 className="text-xl font-semibold">{dataSource?.title}</h3>
      {/* 属性栏 start */}
      <PropertyList className="px-2 pt-4" labelCol={100}>
        <PropertyList.Item
          label="流程类型"
          icon={<PuzzlePieceIcon className="h-3 w-3" />}
        >
          <Tag color="blue">{dataSource?.process_type.name}</Tag>
        </PropertyList.Item>
        <PropertyList.Item
          label="优先级"
          icon={<FlagIcon className="h-3 w-3" />}
        >
          <Tag
            color={priorityColorMap[dataSource?.priority as TaskPriority]}
            bordered={false}
          >
            P{dataSource?.priority}
          </Tag>
        </PropertyList.Item>
        <PropertyList.Item
          label="负责人"
          icon={<UserIcon className="h-3 w-3" />}
        >
          <Avatar.Group
            className="-space-x-2"
            list={owners}
            rowKey={(item) => item.uid}
          />
        </PropertyList.Item>
        <PropertyList.Item
          label="审核人"
          icon={<UserGroupIcon className="h-3 w-3" />}
        >
          <Avatar
            className="ml-0.5 h-6 w-6"
            url={dataSource?.reviewer.avatar}
            name={dataSource?.reviewer.name}
          />
        </PropertyList.Item>
        <PropertyList.Item
          label="状态"
          icon={<PaperClipIcon className="h-3 w-3" />}
        >
          <Tag
            bordered={false}
            color={taskStatusMap[dataSource?.status as TaskStatus]?.color}
          >
            {taskStatusMap[dataSource?.status as TaskStatus]?.text}
          </Tag>
        </PropertyList.Item>
        <PropertyList.Item
          label="开始时间"
          icon={<ClockIcon className="h-3 w-3" />}
        >
          <span>
            {dayjs((dataSource?.start_time ?? 0) * 1000).format('YYYY-MM-DD')}
          </span>
        </PropertyList.Item>
        <PropertyList.Item
          label="结束时间"
          icon={<ClockIcon className="h-3 w-3" />}
        >
          <span>
            {dayjs((dataSource?.end_time ?? 0) * 1000).format('YYYY-MM-DD')}
          </span>
        </PropertyList.Item>
        <PropertyList.Item
          label="创建时间"
          icon={<ClockIcon className="h-3 w-3" />}
        >
          <span>
            {dayjs(dataSource?.createdAt).format('YYYY-MM-DD hh:mm:ss')}
          </span>
        </PropertyList.Item>
      </PropertyList>
      {/* 属性栏 end */}
      <div className="daisy-divider before:h-px after:h-px"></div>
      {/* 内容区 start */}
      <div>
        {/* 后续需要做一下 xss 风险处理 */}
        {taskContentString && (
          <div dangerouslySetInnerHTML={{ __html: taskContentString }}></div>
        )}
        {!taskContentString && (
          <div className='mt-14'>
            <Empty
              imageStyle={{ height: '160px' }}
              image={ContentEmpty}
              description="暂无任务详情"
            />
          </div>
        )}
      </div>
      {/* 内容区 end */}
    </Drawer>
  )
}

export default TaskDetailDrawer
