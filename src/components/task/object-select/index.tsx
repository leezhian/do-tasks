/*
 * @Author: kim
 * @Date: 2023-07-28 23:55:24
 * @Description: 对象筛选下拉框
 */
import { useState, useCallback, useMemo } from 'react'
import { UserGroupIcon } from '@heroicons/react/24/solid'
import { Select } from 'antd'
import type { SelectProps } from 'antd'

const filterOptions: SelectProps['options'] = [
  { value: 1, label: '我的' },
  { value: 0, label: '全部' },
]

export interface ObjectSelectProps {
  value?: string | number
  onSelect?: (value: string | number) => void
}

function ObjectSelect(props: ObjectSelectProps) {
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
        <UserGroupIcon className="mr-1 h-4 w-4" />
        所属 {value ? '·' : ''}
      </div>
      <Select
        open={open}
        value={value}
        bordered={false}
        options={filterOptions}
        onDropdownVisibleChange={toggleSelectOpen}
        dropdownStyle={{ minWidth: '76px' }}
        onSelect={onSelect}
      />
    </label>
  )
}

export default ObjectSelect
