/*
 * @Author: kim
 * @Date: 2023-07-22 11:48:58
 * @Description: 搜索结果选项
 */
import { useCallback, useMemo } from 'react'
import { SearchType } from '@/helpers/enum'

export interface SearchSelectItemProps {
  data?: any
  onClick?: (item: any) => void
}

function SearchSelectItem(props: SearchSelectItemProps) {
  const { data, onClick } = props

  const badgeConfig = useMemo(() => {
    const cls = ['shrink-0 daisy-badge mr-1.5']
    let name = ''

    switch (data?.type) {
      case SearchType.Project:
        cls.push('daisy-badge-primary')
        name = '项目'
        break
      case SearchType.Task:
        cls.push('daisy-badge-neutral')
        name = '任务'
        break
      default:
        break
    }

    return {
      classes: cls.join(' '),
      name,
    }
  }, [data.type])

  const handleClick = useCallback(() => {
    onClick && onClick(data)
  }, [data, onClick])

  return (
    <li
      className="flex w-full cursor-pointer items-center px-2 py-1.5 rounded-md hover:bg-base-content/10"
      onClick={handleClick}
    >
      {!!badgeConfig.name && (
        <div className={badgeConfig.classes}>{badgeConfig.name}</div>
      )}
      <span className="w-full truncate">{data?.name}</span>
    </li>
  )
}

export default SearchSelectItem
