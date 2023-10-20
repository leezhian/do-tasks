/*
 * @Author: kim
 * @Date: 2023-07-27 15:45:35
 * @Description: 表格
 */
import { useState, useMemo, useCallback, useEffect } from 'react'
import type { Key } from 'react'
import dayjs from 'dayjs'
import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import Avatar from '@/components/shared/avatar'
import TaskDetailDrawer from '@/components/task/task-detail-drawer'
import TaskActionsDropdown from '@/components/task/task-actions-dropdown'
import { TaskPriority, TaskStatus } from '@/helpers/enum'
import { getTaskList, updateTaskStatus, Task } from '@/views/task/service'

// 优先级颜色映射
export const priorityColorMap = {
  [TaskPriority.P0]: 'error',
  [TaskPriority.P1]: 'warning',
  [TaskPriority.P2]: 'blue',
  [TaskPriority.P3]: 'green',
  [TaskPriority.P4]: 'default',
}

export const taskStatusMap = {
  [TaskStatus.Done]: {
    text: '已完成',
    color: 'purple',
  },
  [TaskStatus.ReviewFailed]: {
    text: '审核不通过',
    color: 'error',
  },
  [TaskStatus.UnderReview]: {
    text: '审核中',
    color: 'processing',
  },
  [TaskStatus.Todo]: {
    text: '待办',
    color: 'default',
  },
  [TaskStatus.Ban]: {
    text: '已删除',
    color: 'error',
  },
}

export interface TaskTableProps {
  orderBy?: string
  orderMethod?: string
  filterObject?: number
  filterStatus?: number
}

function TaskTable(props: TaskTableProps) {
  const { projectId } = useParams()
  const {
    orderBy,
    orderMethod,
    filterStatus,
    filterObject,
  } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [taskList, setTaskList] = useState<Task[]>([]) // 任务列表
  const [currentPage, setCurrentPage] = useState<number>(1) // 当前页码
  const [taskToast, setTaskToast] = useState<number>() // 任务总数
  const [showTaskDetailDrawer, setShowTaskDetailDrawer] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState<string>()
  const { loading: listLoading } = useRequest(
    () =>
      getTaskList(projectId as string, {
        page: currentPage,
        order_by: orderBy,
        order_method: orderMethod,
        status: filterStatus,
        object: filterObject,
      }),
    {
      onSuccess: (res) => {
        setTaskList(res.list)
        setTaskToast(res.total)
      },
      refreshDeps: [
        currentPage,
        projectId,
        orderBy,
        orderMethod,
        filterStatus,
        filterObject,
      ],
    },
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [projectId, orderBy, orderMethod, filterStatus, filterObject])

  // 打开任务详情弹窗
  const openTaskDetail = useCallback((record: Task) => {
    setCurrentTaskId(record.task_id)
    setShowTaskDetailDrawer(true)
  }, [])

  // 任务状态修改
  const handleTaskStatusChange = useCallback(async (record: Task, status: TaskStatus) => {
    await updateTaskStatus(record.task_id, status)

    setTaskList(tl => {
      return tl?.map((item) => {
        if (item.task_id === record.task_id) {
          return {
            ...item,
            status,
          }
        }
        return item
      })
    })
  }, [])

  // 分页配置
  const paginationProps = useMemo(() => {
    return {
      current: currentPage,
      pageSize: 20,
      showSizeChanger: false,
      showQuickJumper: true,
      total: taskToast,
      onChange: (page: number) => setCurrentPage(page),
    }
  }, [currentPage, taskToast])

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '标题',
        dataIndex: 'title',
        ellipsis: true,
        width: 240,
        render: (text, record) => (
          <a onClick={() => openTaskDetail(record)}>{text}</a>
        ),
      },
      {
        title: '流程类型',
        dataIndex: 'process_type',
        render: (text) => <Tag color="blue">{text.name}</Tag>,
      },
      {
        title: '优先级',
        dataIndex: 'priority',
        width: 80,
        render: (text: TaskPriority) => (
          <Tag color={priorityColorMap[text]}>P{text}</Tag>
        ),
      },
      {
        title: '负责人',
        dataIndex: 'owners',
        width: 120,
        render: (text) => {
          const list = text.map((item: any) => ({
            wrapperClassName: 'border-2',
            className: 'w-6',
            url: item.avatar,
            ...item,
          }))
          return (
            <Avatar.Group
              className="!-space-x-2"
              list={list}
              rowKey={(item) => item.uid}
            />
          )
        },
      },
      {
        title: '审核人',
        dataIndex: 'reviewer',
        width: 80,
        render: (text) => (
          <Avatar className="w-6" url={text.avatar} name={text.name} />
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 80,
        render: (text: TaskStatus) => (
          <Tag color={taskStatusMap[text]?.color}>
            {taskStatusMap[text]?.text}
          </Tag>
        ),
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
        width: 120,
        render: (text) => dayjs(text * 1000).format('YYYY-MM-DD'),
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        width: 120,
        render: (text) => dayjs(text * 1000).format('YYYY-MM-DD'),
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        render: (_text, record) => (
          <TaskActionsDropdown
            status={record?.status}
            onItemClick={(status) => handleTaskStatusChange(record, status)}
          />
        ),
      },
    ]
  }, [handleTaskStatusChange])

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }

  return (
    <>
      <Table
        loading={listLoading}
        columns={columns}
        dataSource={taskList}
        rowSelection={rowSelection}
        pagination={paginationProps}
        rowKey={(record) => record.task_id}
        scroll={{ x: 1200 }}
      />
      {/* 任务详情弹窗 */}
      <TaskDetailDrawer
        open={showTaskDetailDrawer}
        onClose={() => setShowTaskDetailDrawer(false)}
        taskId={currentTaskId}
        onDrowdownItemClick={handleTaskStatusChange}
      />
    </>
  )
}

export default TaskTable
