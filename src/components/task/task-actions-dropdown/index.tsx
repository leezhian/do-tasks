/*
 * @Author: kim
 * @Date: 2023-08-25 16:58:20
 * @Description: 任务处理下拉菜单
 */
import { useMemo } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { _patch } from '@/helpers/request'
import { TaskStatus } from '@/helpers/enum'

export interface TaskActionsDropdownProps {
  status?: TaskStatus
  onItemClick?: (status: TaskStatus) => void
}

const actionsMap = {
  [TaskStatus.Todo]: {
    label: <span className="text-base-content">取消完成</span>,
    key: TaskStatus.Todo,
  },
  [TaskStatus.UnderReview]: {
    label: <span className="text-info">完成任务</span>,
    key: TaskStatus.UnderReview,
  },
  [TaskStatus.ReviewFailed]: {
    label: <span className="text-error">审核不通过</span>,
    key: TaskStatus.ReviewFailed,
  },
  [TaskStatus.Done]: {
    label: <span className="text-success">审核通过</span>,
    key: TaskStatus.Done,
  },
}

function TaskActionsDropdown(props: TaskActionsDropdownProps) {
  const { status, onItemClick } = props

  const dropDownItems = useMemo<MenuProps['items']>(() => {
    let items: MenuProps['items'] = []
  
    if (status === TaskStatus.Todo) {
      items.push(actionsMap[TaskStatus.UnderReview])
    } else if (status === TaskStatus.UnderReview) {
      items = items.concat([
        actionsMap[TaskStatus.Todo],
        actionsMap[TaskStatus.Done],
        actionsMap[TaskStatus.ReviewFailed],
      ])
    } else if (status === TaskStatus.ReviewFailed) {
      items = items.concat([
        actionsMap[TaskStatus.UnderReview],
        actionsMap[TaskStatus.Done],
      ])
    }

    return items
  }, [status])

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e
    const status = Number(key) as TaskStatus
    onItemClick && onItemClick(status)
  }

  return (
    <Dropdown
      menu={{ items: dropDownItems, onClick: handleMenuClick }}
      trigger={['click']}
      disabled={!status || status === TaskStatus.Done}
    >
      <button className="daisy-btn daisy-btn-primary daisy-btn-sm">处理</button>
    </Dropdown>
  )
}

export default TaskActionsDropdown
