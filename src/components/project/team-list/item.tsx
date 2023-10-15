/*
 * @Author: kim
 * @Date: 2023-07-22 01:43:27
 * @Description: 团队列表项
 */
import { useCallback, type MouseEventHandler } from 'react'
import SwiperCell from '@/components/shared/swiper-cell'

export interface TeamItemProps {
  data?: any
  className?: string
  onClick?: (data?: any) => void
  onDelete?: (data?: any) => void
  onContextMenu?: MouseEventHandler
}

function TeamItem(props: TeamItemProps) {
  const { data, className, onClick, onDelete } = props

  const handleClick = useCallback(() => {
    onClick && onClick(data)
  }, [onClick, data])

  const handleDelete = useCallback(() => {
    onDelete && onDelete(data)
  }, [onDelete, data])

  return (
    <SwiperCell
      right={
        <button
          className="h-11 select-none rounded-lg border border-error bg-error px-4 font-semibold text-base-100"
          onClick={handleDelete}
        >
          删除
        </button>
      }
    >
      <div className={className} key={data?.team_id} onClick={handleClick}>
        {data?.name}
      </div>
    </SwiperCell>
  )
}

export default TeamItem
