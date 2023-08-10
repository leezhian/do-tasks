/*
 * @Author: kim
 * @Date: 2023-07-22 10:50:34
 * @Description: 搜索框
 */
import { useMemo, useCallback, useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import List from '@/components/shared/list'
import SearchSelectItem from './search-select-item'
import Empty from '@/components/shared/empty'
import SearchEmpty from '@/assets/images/search-empty.png'

export interface SearchInputProps {
  className?: string
  onSearchItem?: (item: any) => void
}

const demoList = [
  { id: 1, title: '111', type: 2 },
  { id: 2, title: '222', type: 1 },
  { id: 3, title: '333', type: 2 },
]

const SearchInput = forwardRef((props: SearchInputProps, ref) => {
  const { className, onSearchItem } = props
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [searchSelectVisiable, setSearchSelectVisiable] = useState(false)

  useImperativeHandle(ref, () => ({
    focus: () => {
      searchRef.current?.focus()
    }
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

  const handleSearchItemClick = (item: any) => {
    setSearchSelectVisiable(false)
    onSearchItem && onSearchItem(item)
  }

  // 渲染搜索下拉列表项
  const renderSearchSelectItem = useCallback((item: any) => {
    return (
      <SearchSelectItem
        onClick={handleSearchItemClick}
        key={item.id}
        data={item}
      />
    )
  }, [])

  // 搜索下拉列表显示隐藏
  const toggleSearchSelectVisiable = useCallback(
    () => setSearchSelectVisiable((prev) => !prev),
    [],
  )

  const handleSearch = useCallback(() => {
    console.log('fetch search')
  }, [])

  return (
    <div className={classes} ref={searchWrapRef}>
      <label className="flex w-full items-center pl-3 ">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          ref={searchRef}
          type="text"
          placeholder="搜索任务 / 团队"
          className="daisy-input daisy-input-md w-full bg-transparent px-3 focus:outline-0"
          onFocus={toggleSearchSelectVisiable}
          onChange={handleSearch}
        />
      </label>

      <div
        className={`absolute left-0 right-0 z-50 mt-2 max-h-[60vh] overflow-x-hidden overflow-y-scroll rounded-lg bg-base-100 py-2 shadow-lg sm:max-h-96 ${
          searchSelectVisiable ? 'block' : 'hidden'
        }`}
      >
        <List
          loading={false}
          dataSource={demoList}
          renderItem={renderSearchSelectItem}
          renderEmpty={<Empty image={SearchEmpty} description="暂无搜索结果" />}
        />
      </div>
    </div>
  )
})

export default SearchInput
