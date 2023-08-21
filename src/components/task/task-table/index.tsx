/*
 * @Author: kim
 * @Date: 2023-07-27 15:45:35
 * @Description: 表格
 */
import { useState } from 'react'
import type { Key } from 'react'
import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import * as dayjs from 'dayjs'
import Avatar from '@/components/shared/avatar'
import { TaskPriority, TaskStatus } from '@/helpers/enum'

// 优先级颜色映射
const priorityColorMap = {
  [TaskPriority.P0]: 'error',
  [TaskPriority.P1]: 'warning',
  [TaskPriority.P2]: 'blue',
  [TaskPriority.P3]: 'green',
  [TaskPriority.P4]: 'default',
}

const taskStatusMap = {
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

const columns: ColumnsType<any> = [
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
    width: 240,
    render: (text) => <a>{text}</a>,
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
    render: (text: TaskPriority) => <Tag color={priorityColorMap[text]}>P{text}</Tag>,
  },
  {
    title: '负责人',
    dataIndex: 'owners',
    render: (text) => {
      const list = text.map((item: any) => ({
        wrapperClassName: 'border-2',
        className: 'w-6',
        url: item.avatar,
        ...item
      }))
      return <Avatar.Group className='-space-x-2' list={list} rowKey={(item) => item.uid} />
    },
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
    width: 80,
    render: (text) => <Avatar className='w-6' url={text.avatar} name={text.name} />
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    render: (text: TaskStatus) => <Tag color={taskStatusMap[text]?.color}>{taskStatusMap[text]?.text}</Tag>,
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
    render: (text) => dayjs(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    render: () => (<div>
      <button className='daisy-btn daisy-btn-xs daisy-btn-primary'>完成</button>
    </div>),
  }
]
export interface TaskTableProps {
  dataSource?: any[]
  loading?: boolean
}

function TaskTable(props: TaskTableProps) {
  const { dataSource = [], loading } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
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
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      pagination={false}
      rowKey={(record) => record.task_id}
      scroll={{ x: 1200 }}
    />
  )
}

export default TaskTable
