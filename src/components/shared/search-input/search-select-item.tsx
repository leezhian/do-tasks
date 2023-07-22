/*
 * @Author: kim
 * @Date: 2023-07-22 11:48:58
 * @Description: 搜索结果选项
 */
import { useMemo } from 'react'

export interface SearchSelectItemProps {
  data?: any
}

export enum SearchType {
  Team = 1,
  Task = 2,
}

function SearchSelectItem(props: SearchSelectItemProps) {
  const { data } = props

  const badgeConfig = useMemo(() => {
    const cls = ['shrink-0 badge mr-1.5']
    let name = ''

    switch (data?.type) {
      case SearchType.Team:
        cls.push('badge-primary')
        name = '团队'
        break
      case SearchType.Task:
        cls.push('badge-neutral')
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

  return (
    <li className="flex  w-full cursor-pointer items-center px-2 py-1 hover:bg-base-content/10">
      { !!badgeConfig.name && <div className={badgeConfig.classes}>{ badgeConfig.name }</div>}
      <span className="w-full truncate">
        {data?.title}
      </span>
    </li>
  )
}

export default SearchSelectItem
