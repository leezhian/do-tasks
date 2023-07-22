/*
 * @Author: kim
 * @Date: 2023-07-22 10:50:34
 * @Description: 搜索框
 */
import { useMemo, useCallback, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import List from '@/components/shared/list'
import SearchSelectItem from './search-select-item'
import Empty from '@/components/shared/empty'
import SearchEmpty from '@/assets/images/search-empty.svg'

interface SearchInputProps {
  className?: string
}

const demoList = [
  { id: 1, title: '111', type: 2 },
  { id: 2, title: '222', type: 1 },
  { id: 3, title: '333', type: 2 },
  { id: 4, title: '444', type: 2 },
  { id: 5, title: '555', type: 1 },
  { id: 6, title: '666', type: 2 },
  { id: 7, title: '777', type: 1 },
  { id: 8, title: '888', type: 1 },
  { id: 9, title: '999', type: 2 },
  { id: 10, title: '101010', type: 2 },
  { id: 11, title: '111111', type: 1 },
  { id: 12, title: '121212', type: 2 },
  { id: 13, title: '131313', type: 1 },
  { id: 14, title: '141414', type: 2 },
  { id: 15, title: '151515', type: 1 },
]

function SearchInput(props: SearchInputProps) {
  const { className } = props
  const [searchSelectVisiable, setSearchSelectVisiable] = useState(false)

  const classes = useMemo(() => {
    const cls = ['relative rounded-lg bg-base-200']

    if (className) {
      cls.push(className)
    }

    return cls.join(' ')
  }, [className])

  const renderSearchSelectItem = useCallback((item: any) => {
    return <SearchSelectItem key={item.id} data={item} />
  }, [])

  const toggleSearchSelectVisiable = useCallback(
    () => setSearchSelectVisiable((prev) => !prev),
    [],
  )

  const handleSearch = useCallback(() => {
    console.log('fetch search')
  }, [])

  return (
    <div className={classes}>
      <label className="flex w-full items-center pl-3">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          type="text"
          placeholder="搜索任务 / 团队"
          className="input input-md w-full bg-transparent px-3 focus:outline-0"
          onFocus={toggleSearchSelectVisiable}
          onBlur={toggleSearchSelectVisiable}
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
}

export default SearchInput
