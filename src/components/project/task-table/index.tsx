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

interface DataType {
  id: string | number
  name: string
  tags: string
  priority: string
  person_in_charge: any[]
  reviewer: any[]
  start_time: string
  end_time: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '流程类型',
    dataIndex: 'tags',
  },
  {
    title: '优先级',
    dataIndex: 'priority',
  },
  {
    title: '负责人',
    dataIndex: 'person_in_charge',
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
  },
  {
    title: '结束时间',
    dataIndex: 'start_time',
  },
]

const data: DataType[] = [
  {
    id: '1',
    name: 'John Brown',
    tags: 'nice',
    priority: '0',
    person_in_charge: ['张三'],
    reviewer: ['李四'],
    start_time: '2021-07-27',
    end_time: '2021-07-27',
  },
]

function TaskTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
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
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      pagination={false}
    />
  )
}

export default TaskTable
