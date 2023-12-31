/*
 * @Author: kim
 * @Date: 2023-07-28 23:55:24
 * @Description: 筛选下拉框
 */
import { useState, useCallback, useMemo } from 'react'
import { FunnelIcon } from '@heroicons/react/24/solid'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import { TaskStatus } from '@/helpers/enum'

const filterOptions: SelectProps['options'] = [
  { value: TaskStatus.Todo, label: '未完成' },
  { value: TaskStatus.UnderReview, label: '审核中' },
  { value: TaskStatus.Done, label: '已完成' },
]

export interface FilterSelectProps {
  value?: string | number
  onSelect?: (value: string | number) => void
}

function FilterSelect(props: FilterSelectProps) {
  const { value, onSelect } = props
  const [open, setOpen] = useState(false)

  const classes = useMemo(() => {
    return `inline-flex items-center select-none pl-2 rounded-md ${
      value ? 'bg-primary-content' : ''
    }`
  }, [value])

  const toggleSelectOpen = useCallback((o: boolean) => {
    setOpen(o)
  }, [])

  const handleLabelClick = useCallback(() => {
    if (!open) {
      setOpen(true)
    }
  }, [open])

  return (
    <label className={classes}>
      <div
        className="flex cursor-pointer items-center"
        onClick={handleLabelClick}
      >
        <FunnelIcon className="mr-1 h-4 w-4" />
        筛选 {value ? '·' : ''}
      </div>
      <Select
        open={open}
        value={value}
        bordered={false}
        allowClear
        options={filterOptions}
        onDropdownVisibleChange={toggleSelectOpen}
        dropdownStyle={{ minWidth: '76px' }}
        onChange={onSelect}
      />
    </label>
  )
}

export default FilterSelect
