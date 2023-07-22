/*
 * @Author: kim
 * @Date: 2023-07-22 01:43:27
 * @Description: 团队列表项
 */
import { useCallback } from 'react'

export interface TeamItemProps {
  data?: Record<string, any>
  className?: string
  onClick?: (data?: Record<string, any>) => void
}

function TeamItem(props: TeamItemProps) {
  const { data, className, onClick } = props

  const handleClick = useCallback(() => {
    onClick && onClick(data)
  }, [onClick, data])

  return (
    <li className={className} key={data?.id} onClick={handleClick}>
      {data?.name}
    </li>
  )
}

export default TeamItem
