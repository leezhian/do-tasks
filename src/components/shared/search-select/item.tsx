/*
 * @Author: kim
 * @Date: 2023-08-11 01:39:18
 * @Description: 搜索下拉列表的选项
 */
import { memo, useCallback, useMemo } from 'react'
import type { MouseEvent } from 'react'
import { theme } from 'antd'
import type { Option } from './index'

export interface SearchSelectItemProps {
  item: Option
  focus?: boolean
  active?: boolean
  showClose?: boolean
  onClick?: (item: Option) => void
  onRemove?: (item: Option) => void
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void
}

const { useToken } = theme

function SearchSelectItem(props: SearchSelectItemProps) {
  const { token } = useToken()
  const {
    item,
    onClick,
    focus = false,
    active = false,
    showClose = false,
    onMouseEnter,
    onRemove,
  } = props

  const handleRemove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onRemove && onRemove(item)
    },
    [onRemove, item],
  )

  const optionBg = useMemo(() => {
    if (active) {
      return token.controlItemBgActive
    }
    if (focus) {
      return token.controlItemBgHover
    }

    return ''
  }, [token, active, focus])

  return (
    <div
      className="min-h-8 relative flex cursor-pointer rounded px-3 py-[5px]"
      key={item?.value}
      style={{
        background: optionBg,
      }}
      title={item?.label}
      onClick={() => onClick?.(item)}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex-auto truncate pr-4 leading-normal">
        {item?.value === 'custom' ? `创建 ${item?.label}` : item?.label}
      </div>
      {showClose && (
        <button
          className="daisy-btn-ghost inline-flex h-6 w-6 shrink-0 cursor-pointer select-none items-center justify-center rounded-full border-none text-center text-base-content"
          onClick={handleRemove}
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default memo(SearchSelectItem)
