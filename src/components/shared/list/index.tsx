import type { ReactNode } from 'react'

export interface ListProps {
  className?: string
  dataSource?: any[]
  renderItem?: (item: any) => ReactNode
}

function List(props: ListProps) {
  const { className, dataSource = [], renderItem } = props

  return (
    <ul className={className}>
      {dataSource.map((item) => {
        return renderItem ? (
          renderItem(item)
        ) : (
          <li key={item.id}>{item.name}</li>
        )
      })}
    </ul>
  )
}

export default List
