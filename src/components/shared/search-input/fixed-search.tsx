/*
 * @Author: kim
 * @Date: 2023-07-26 16:53:17
 * @Description:
 */
import { useCallback, memo, useEffect, useRef } from 'react'
import { useKeyPress } from 'ahooks'
import SearchInput, { SearchInputProps } from './index'
import Mask from '@/components/shared/mask'

export interface FixedSearchProps extends SearchInputProps {
  show?: boolean
  keyborad?: boolean
  maskCloseble?: boolean
  onShowChange?: (show: boolean) => void // 显示隐藏回调(仅内部触发，外部通过修改 show 不会触发)
}

const FixedSearch = memo((props: FixedSearchProps) => {
  const {
    show = false,
    keyborad = true,
    maskCloseble = true,
    onShowChange,
    onSearchItem,
  } = props
  // const [show, setShow] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (show) {
      searchInputRef.current?.focus()
    }
  }, [show])

  const handleMaskClick = useCallback(() => {
    if (maskCloseble) {
      onShowChange && onShowChange(false)
    }
  }, [onShowChange, maskCloseble])

  return (
    <Mask show={show} onClick={handleMaskClick}>
      <SearchInput
        className="!absolute left-1/2 top-20 z-10 w-130 max-w-[80%] -translate-x-1/2"
        ref={searchInputRef}
        onSearchItem={onSearchItem}
      />
    </Mask>
  )
})

export default FixedSearch
