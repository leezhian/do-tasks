/*
 * @Author: kim
 * @Date: 2023-07-22 01:46:37
 * @Description: 列表
 */
import { useMemo, forwardRef } from 'react'
import type { ReactNode } from 'react'
import ContentEmpty from '@/assets/images/content-empty.png'
import Empty from '@/components/shared/empty'

export interface ListProps {
  className?: string
  dataSource?: any[]
  renderItem?: (item: any) => ReactNode
  renderEmpty?: ReactNode // 自定义空状态
  loading?: boolean
}

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    className,
    dataSource = [],
    renderItem,
    renderEmpty,
    loading = false,
  } = props

  const content = useMemo(() => {
    if (loading)
      return (
        <div className="text-center">
          <span className="daisy-loading daisy-loading-spinner daisy-loading-md"></span>
        </div>
      )

    if (dataSource.length) {
      return dataSource.map((item) => {
        return renderItem ? (
          renderItem(item)
        ) : (
          <li key={item.id}>{item.name}</li>
        )
      })
    }

    return renderEmpty ? (
      renderEmpty
    ) : (
      <Empty image={ContentEmpty} description="暂无内容" />
    )
  }, [dataSource, renderItem, renderEmpty, loading])

  return (
    <ul ref={ref} className={className}>
      {content}
    </ul>
  )
})

export default List
