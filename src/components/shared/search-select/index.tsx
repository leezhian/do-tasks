/*
 * @Author: kim
 * @Date: 2023-08-11 00:04:32
 * @Description: 带搜索的下拉列表(只有单选)
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { ChangeEventHandler } from 'react'
import { theme } from 'antd'
import SearchSelectItem from './item'

export interface Option {
  label: string
  value: number | string
}

export interface SearchSelectProps {
  value?: number | string
  options?: Option[]
  placeholder?: string
  onSelect?: (value: number | string, option: Option) => void
}

const { useToken } = theme

function SearchSelect(props: SearchSelectProps) {
  const { options = [], placeholder = '', value, onSelect } = props
  const { token } = useToken()
  const selectWrapRef = useRef<HTMLDivElement>(null)
  const selectInputRef = useRef<HTMLInputElement>(null)
  const selectDropdownRef = useRef<HTMLInputElement>(null)
  const [selectWidth, setSelectWidth] = useState(120) // 下拉框的宽度

  const [isFirstRenderDropdown, setIsFirstRenderDropdown] = useState(false) // 是否第一次渲染
  const [isFocus, setIsFocus] = useState(false) // 是否聚焦
  const [focusIndex, setFocusIndex] = useState<number>(-1) // 聚焦的选项

  const [filterOptions, setFilterOptions] = useState(options || []) // 过滤后的options
  const [selectedOption, setSelectedOption] = useState<Option | null>(null) // 选中的option

  const [innerValue, setInnerValue] = useState(value) // 内部的值, 用于非受控时使用
  const [searchValue, setSearchValue] = useState<string>('') // 搜索框的值
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
  })

  const handleInputFocus = () => {
    const wrapRect = selectWrapRef.current?.getBoundingClientRect()
    const x = wrapRect?.left || 0
    const y = (wrapRect?.top || 0) + (wrapRect?.height || 0) + 6
    setDropdownPosition({
      x,
      y,
    })
    setIsFirstRenderDropdown(true)
    setIsFocus(true)
  }

  // 重置内部数据
  const resetPrivateData = useCallback(() => {
    setIsFocus(false)
    setSearchValue('')
    setFocusIndex(-1)
    setFilterOptions(options)
    selectInputRef.current?.blur()
  }, [options])

  // 处理失焦
  const handleInputBlur = useCallback(
    (e: any) => {
      if (
        isFocus &&
        selectInputRef.current &&
        !selectInputRef.current.contains(e.target)
      ) {
        resetPrivateData()
      }
    },
    [isFocus, resetPrivateData],
  )

  // 选项点击
  const handleOptionClick = useCallback(
    (option: Option) => {
      if (value === undefined) {
        setSelectedOption(option)
        setInnerValue(option.value)
      }
      onSelect && onSelect(option.value, option)
    },
    [value, onSelect],
  )

  // 处理键盘事件
  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const { key, isComposing } = e
      if (
        (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Enter') ||
        isComposing
      ) {
        return
      }

      switch (key) {
        case 'ArrowDown':
          setFocusIndex((prev) => {
            if (prev >= filterOptions.length - 1 || prev < 0) {
              return 0
            }
            return prev + 1
          })
          break
        case 'ArrowUp':
          setFocusIndex((prev) => {
            if (prev <= 0) {
              return filterOptions.length - 1
            }
            return prev - 1
          })
          break
        case 'Enter':
          if (focusIndex >= 0 && filterOptions[focusIndex]) {
            handleOptionClick(filterOptions[focusIndex])
            resetPrivateData()
          }
          break
      }
    },
    [filterOptions, focusIndex, handleOptionClick, resetPrivateData],
  )

  useEffect(() => {
    const selectWidth = selectWrapRef.current?.offsetWidth || 120
    setSelectWidth(selectWidth)

    document.addEventListener('click', handleInputBlur)
    selectInputRef.current?.addEventListener('focus', handleInputFocus)
    selectInputRef.current?.addEventListener('keydown', handleInputKeyDown)

    return () => {
      document.removeEventListener('click', handleInputBlur)
      selectInputRef.current?.removeEventListener('focus', handleInputFocus)
      selectInputRef.current?.removeEventListener('keydown', handleInputKeyDown)
    }
  }, [handleInputBlur, handleInputKeyDown])

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  useEffect(() => {
    setFilterOptions(options)
  }, [options])

  useEffect(() => {
    const target = options.find((item) => item.value === innerValue)
    setSelectedOption(target || null)
  }, [innerValue, options])

  // 选项鼠标移入
  const handleOptionEnter = (optionIndex: number) => {
    setFocusIndex(optionIndex)
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target
    setSearchValue(value)
    setFocusIndex(-1)
    const reg = new RegExp(value, 'ig')
    let filterResult = options.filter((item) => reg.test(item.label))
    if (filterResult.length <= 0) {
      filterResult = [{
        label: `创建 ${value}`,
        value: value,
      }]
    }
    setFilterOptions(filterResult)
  }

  return (
    <div
      className="relative max-w-[200px] cursor-pointer text-sm"
      ref={selectWrapRef}
    >
      <div
        className="relative flex h-8 w-full cursor-text rounded-md border bg-base-100 px-3"
        style={{
          borderColor: token.colorBorder,
        }}
      >
        <span
          className={`relative flex-1 truncate leading-[30px] ${
            searchValue && isFocus ? 'invisible' : ''
          }`}
          style={{ color: token.colorTextQuaternary }}
        >
          {selectedOption?.label || innerValue || placeholder}
        </span>
        <span className="absolute bottom-0 end-3 start-3 top-0">
          <input
            ref={selectInputRef}
            className="h-[30px] w-full border-none bg-transparent text-inherit outline-none"
            type="search"
            autoComplete="off"
            value={searchValue}
            onChange={handleInputChange}
          />
        </span>
      </div>

      {isFirstRenderDropdown &&
        createPortal(
          <div ref={selectDropdownRef}>
            <div
              className={`absolute z-infinity min-w-[120px] overflow-hidden rounded-lg bg-base-100 p-1 ${
                isFocus ? '' : 'hidden'
              }`}
              style={{
                background: token.colorBgElevated,
                width: `${selectWidth}px`,
                left: `${dropdownPosition.x}px`,
                top: `${dropdownPosition.y}px`,
                boxShadow: token.boxShadow
              }}
            >
              <div className="relative max-h-64 overflow-y-scroll ">
                <div className="flex flex-col">
                  {filterOptions.map((item, index) => (
                    <SearchSelectItem
                      key={item.value}
                      item={item}
                      focus={focusIndex === index}
                      active={innerValue === item.value}
                      onClick={handleOptionClick}
                      onMouseEnter={() => handleOptionEnter(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}

export default SearchSelect
