/*
 * @Author: kim
 * @Date: 2023-08-22 18:38:52
 * @Description: 任务详情抽屉
 */
import { useMemo, useState, useRef } from 'react'
import { Drawer, Tag, DrawerProps } from 'antd'
import dayjs from 'dayjs'
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
import { upload } from '@/helpers/upload-file'
import { priorityColorMap, taskStatusMap } from '@/components/task/task-table'
import Empty from '@/components/shared/empty'
import Avatar from '@/components/shared/avatar'
import PropertyList from '@/components/task/property-list'
import TaskActionsDropdown from '@/components/task/task-actions-dropdown'
import TaskSettingModal, { TaskModalRef } from '@/components/task/task-setting-modal'
import Toast from '@/components/shared/toast'
import ContentEmpty from '@/assets/images/content-empty.png'
import {
  updateTask,
  TaskUpdatePayload,
} from '@/views/task/service'

function fetchTaskContent(path: string) {
  if (!path) {
    return Promise.resolve('')
  }

  return _get<string>(path)
}

function fetchTaskDetail(taskId: string) {
  if (!taskId) {
    return Promise.reject('没有任务id')
  }
  return _get<TaskDetail>(`/task/${taskId}`)
}

export interface TaskDetailDrawerProps extends DrawerProps {
  // dataSource?: any
  taskId?: string
  onDrowdownItemClick?: (record: any, status: TaskStatus) => void
}

export interface TaskDetail {
  content?: string
  createdAt: string
  end_time: number
  priority: number
  start_time: number
  status: number
  task_id: string
  title: string
  owners: {
    avatar: string
    name: string
    uid: string
  }[]
  process_type: {
    id: number
    name: string
  }
  reviewer: {
    avatar: string
    name: string
    uid: string
  }
}

function TaskDetailDrawer(props: TaskDetailDrawerProps) {
  const { taskId, onDrowdownItemClick, ...restProps } = props
  const taskModalRef = useRef<TaskModalRef>(null)
  const [dataSource, setDataSource] = useState<TaskDetail>()
  const [fullScreen, setFullScreen] = useState(false)
  const [showTaskSettingModal, setShowTaskSettingModal] = useState(false)
  const { data: taskContentString } = useRequest(
    () => fetchTaskContent(dataSource?.content as string),
    {
      refreshDeps: [dataSource?.content],
    },
  )
  const { refresh: refreshTaskDetail } = useRequest(
    () => fetchTaskDetail(taskId as string),
    {
      onSuccess: (res) => {
        setDataSource(res)
      },
      onError: () => {},
      refreshDeps: [taskId],
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

  const handleShowTaskSettingModal = () => {
    if(!dataSource) return
    setShowTaskSettingModal(true)
    
    // 回填数据
    taskModalRef.current?.setFieldsValue({
      title: dataSource.title,
      priority: dataSource.priority,
      content: taskContentString,
      process_type: dataSource.process_type.id,
      datetime: [dayjs(dataSource.start_time * 1000), dayjs(dataSource.end_time * 1000)],
      reviewer: dataSource.reviewer.uid,
      owner: dataSource.owners.map((item: any) => item.uid),
    })
  }

  // 修改任务
  const handleUpdateTask = async (formData: any) => {
    try {
      const payload: TaskUpdatePayload = {
        title: formData.title,
        owner_ids: formData.owner.join(','),
        reviewer_id: formData.reviewer,
        priority: formData.priority,
        process_type_id: formData.process_type,
        start_time: formData.datetime[0].startOf('day').unix(),
        end_time: formData.datetime[1].startOf('day').unix(),
      }

      // 内容上传
      const { content } = formData
      if (content && content.trim() !== '') {
        const res = await upload('text/html', `${Date.now()}.html`, content)
        payload.content = res.url
      }

      await updateTask(dataSource?.task_id ?? '', payload)
      Toast.success('修改任务成功')
      refreshTaskDetail()
      setShowTaskSettingModal(false)
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  return (
    <>
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
            <button
              className="daisy-btn daisy-btn-outline daisy-btn-sm"
              onClick={handleShowTaskSettingModal}
              disabled={
                !dataSource?.status || dataSource?.status === TaskStatus.Done
              }
            >
              编辑
            </button>
            <TaskActionsDropdown
              status={dataSource?.status}
              onItemClick={(status) =>
                onDrowdownItemClick?.(dataSource, status)
              }
            />
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
            <div className="mt-14">
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
      <TaskSettingModal ref={taskModalRef} open={showTaskSettingModal} onOk={handleUpdateTask} onCancel={() => setShowTaskSettingModal(false)} />
    </>
  )
}

export default TaskDetailDrawer
