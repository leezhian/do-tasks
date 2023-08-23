/*
 * @Author: kim
 * @Date: 2023-07-22 10:50:34
 * @Description: 搜索框
 */
import {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  ChangeEventHandler,
} from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import List from '@/components/shared/list'
import SearchSelectItem from './search-select-item'
import Empty from '@/components/shared/empty'
import SearchEmpty from '@/assets/images/search-empty.png'

export interface SearchInputProps {
  className?: string
  loading?: boolean
  searchList?: any[]
  onChange?: ChangeEventHandler<HTMLInputElement>
  onSearchItem?: (item: any) => void
  placeholder?: string
}

const SearchInput = forwardRef((props: SearchInputProps, ref) => {
  const {
    className,
    placeholder,
    loading,
    searchList,
    onSearchItem,
    onChange,
  } = props
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [searchSelectVisiable, setSearchSelectVisiable] = useState(false)

  useImperativeHandle(ref, () => ({
    focus: () => {
      searchRef.current?.focus()
    },
  }))

  // 点击区域外关闭搜索下拉列表
  const searchBlur = useCallback((e: any) => {
    if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
      setSearchSelectVisiable(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', searchBlur)

    return () => {
      document.removeEventListener('click', searchBlur)
    }
  }, [searchBlur])

  const classes = useMemo(() => {
    const cls = ['relative rounded-lg bg-base-100']

    if (className) {
      cls.push(className)
    }

    return cls.join(' ')
  }, [className])

  const handleSearchItemClick = useCallback(
    (item: any) => {
      setSearchSelectVisiable(false)
      onSearchItem && onSearchItem(item)
    },
    [onSearchItem],
  )

  // 渲染搜索下拉列表项
  const renderSearchSelectItem = useCallback(
    (item: any) => {
      return (
        <SearchSelectItem
          onClick={handleSearchItemClick}
          key={item.id}
          data={item}
        />
      )
    },
    [handleSearchItemClick],
  )

  // 搜索下拉列表显示隐藏
  const toggleSearchSelectVisiable = useCallback(() => {
    setSearchSelectVisiable(true)
  }, [])

  return (
    <div className={classes} ref={searchWrapRef}>
      <label className="flex w-full items-center pl-3 ">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          ref={searchRef}
          type="text"
          placeholder={placeholder}
          className="daisy-input daisy-input-md w-full bg-transparent px-3 focus:outline-0"
          onFocus={toggleSearchSelectVisiable}
          onChange={onChange}
        />
      </label>

      <div
        className={`absolute left-0 right-0 z-50 mt-2 max-h-[60vh] overflow-x-hidden overflow-y-scroll rounded-lg bg-base-100 p-2 shadow-lg sm:max-h-96 ${
          searchSelectVisiable ? 'block' : 'hidden'
        }`}
      >
        <List
          loading={loading}
          dataSource={searchList}
          renderItem={renderSearchSelectItem}
          renderEmpty={<Empty image={SearchEmpty} description="暂无搜索结果" />}
        />
      </div>
    </div>
  )
})

export default SearchInput
