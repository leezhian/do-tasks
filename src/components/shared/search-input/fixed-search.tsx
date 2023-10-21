/*
 * @Author: kim
 * @Date: 2023-07-26 16:53:17
 * @Description: 悬浮搜索框
 */
import { useCallback, memo, useRef } from 'react'
import type { ChangeEventHandler } from 'react'
import { useDebounceFn, useKeyPress, useRequest } from 'ahooks'
import Mask from '@/components/shared/mask'
import { _get } from '@/helpers/request'
import { SearchType } from '@/helpers/enum'
import SearchInput, { SearchInputProps } from './index'

export interface SearchResultItem {
  id: string
  name: string
  team_id: string
  project_id: string
  task_id: string
  type: SearchType
}

export interface FixedSearchProps extends SearchInputProps {
  show?: boolean
  keyborad?: boolean
  maskCloseble?: boolean
  onShowChange?: (show: boolean) => void // 显示隐藏回调(仅内部触发，外部通过修改 show 不会触发)
}

const fetchSearch = (value: string) => {
  return _get<SearchResultItem[]>('/common/search', {
    keyword: value
  })
}

const FixedSearch = memo((props: FixedSearchProps) => {
  const {
    show = false,
    keyborad = true,
    maskCloseble = true,
    onShowChange,
    onSearchItem,
  } = props
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { loading, cancel: searchCancel, data, run: search } = useRequest(fetchSearch, { manual: true })
  const { run: debounceSearch } = useDebounceFn((value) => {
    if (loading) {
      searchCancel()
    }
    search(value)
  }, {
    wait: 500,
  })

  useKeyPress(
    ['meta.k'],
    () => {
      if (keyborad) {
        onShowChange && onShowChange(true)
      }
    },
    { exactMatch: true },
  )

  useKeyPress(
    ['esc'],
    () => {
      if (keyborad) {
        onShowChange && onShowChange(false)
      }
    },
    { exactMatch: true },
  )

  const handleMaskClick = useCallback(() => {
    if (maskCloseble) {
      onShowChange && onShowChange(false)
    }
  }, [onShowChange, maskCloseble])

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    debounceSearch(value)
  }

  return (
    <Mask show={show} onClick={handleMaskClick}>
      <SearchInput
        className="!absolute left-1/2 top-20 z-10 w-130 max-w-[80%] -translate-x-1/2"
        ref={searchInputRef}
        placeholder='搜索任务 / 项目'
        loading={loading}
        searchList={data}
        onChange={handleSearchInputChange}
        onSearchItem={onSearchItem}
      />
    </Mask>
  )
})

export default FixedSearch
