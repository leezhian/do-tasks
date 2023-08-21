/*
 * @Author: kim
 * @Date: 2023-07-28 23:55:19
 * @Description: 排序下拉框
 */
import { useState, useCallback, useMemo } from 'react'
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/solid'
import { Select } from 'antd'
import type { SelectProps } from 'antd'

const sortOptions: SelectProps['options'] = [
  { value: 'priority', label: '优先级' },
  { value: 'start_time', label: '开始时间' },
  { value: 'end_time', label: '结束时间' },
  { value: 'createdAt', label: '创建时间' },
]

type SortMethod = 'desc' | 'asc'

export interface SortSelectProps {
  value?: string | number
  onSelect?: (value: string | number) => void
  onSortMethodChange?: (sortMethod: SortMethod) => void
}

function SortSelect(props: SortSelectProps) {
  const { value, onSelect, onSortMethodChange } = props
  const [sortMethod, setSortMethod] = useState<SortMethod>('desc')

  const classes = useMemo(() => {
    return `inline-flex items-center select-none pl-2 rounded-md ${
      value ? 'bg-primary-content' : ''
    }`
  }, [value])

  const toggleSortMethod = useCallback(() => {
    setSortMethod((st) => (st === 'desc' ? 'asc' : 'desc'))
    onSortMethodChange && onSortMethodChange(sortMethod)
  }, [onSortMethodChange])

  return (
    <label className={classes}>
      <div className="flex items-center">
        <div className="mr-1 cursor-pointer" onClick={toggleSortMethod}>
          {sortMethod === 'desc' ? (
            <BarsArrowDownIcon className="h-4 w-4" />
          ) : (
            <BarsArrowUpIcon className="h-4 w-4" />
          )}
        </div>
        排序 {value ? '·' : ''}
      </div>

      <Select
        value={value}
        bordered={false}
        options={sortOptions}
        dropdownStyle={{ minWidth: '98px' }}
        onSelect={onSelect}
      />
    </label>
  )
}

export default SortSelect
