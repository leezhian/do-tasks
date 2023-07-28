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
  { value: 'name', label: '名称' },
  { value: 'start_time', label: '开始时间' },
  { value: 'end_time', label: '结束时间' },
]

type SortType = 'desc' | 'asce'

export interface SortSelectProps {
  value?: string | number
  onSelect?: (value: string | number) => void
}

function SortSelect(props: SortSelectProps) {
  const { value, onSelect } = props
  const [sortType, setSortType] = useState<SortType>('desc')

  const classes = useMemo(() => {
    return `inline-flex items-center select-none pl-2 rounded-md ${
      value ? 'bg-primary-content' : ''
    }`
  }, [value])

  const toggleSortType = useCallback(() => {
    setSortType((st) => (st === 'desc' ? 'asce' : 'desc'))
  }, [])

  return (
    <label className={classes}>
      <div className="flex items-center">
        <div className="mr-1 cursor-pointer" onClick={toggleSortType}>
          {sortType === 'desc' ? (
            <BarsArrowDownIcon className=" h-4 w-4" />
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
        dropdownStyle={{ minWidth: '76px' }}
        onSelect={onSelect}
      />
    </label>
  )
}

export default SortSelect
