/*
 * @Author: kim
 * @Date: 2023-08-11 18:44:41
 * @Description: 优先级选择
 */
import { Select, SelectProps } from 'antd'
import { TaskPriority } from '@/helpers/enum'

const priorityOptions = [
  { label: 'P0', value: TaskPriority.P0 },
  { label: 'P1', value: TaskPriority.P1 },
  { label: 'P2', value: TaskPriority.P2 },
  { label: 'P3', value: TaskPriority.P3 },
  { label: 'P4', value: TaskPriority.P4 },
]

function PrioritySelect(props: SelectProps) {
  return (
    <Select
      {...props}
      bordered={false}
      options={priorityOptions}
      placeholder="选择优先级"
      size="large"
      showArrow={false}
      className={`rounded-bl-lg rounded-tl-lg bg-base-200`}
    />
  )
}

export default PrioritySelect
