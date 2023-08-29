/*
 * @Author: kim
 * @Date: 2023-08-30 00:39:53
 * @Description: 分组柱状图
 */
import { useEffect, useRef } from 'react'
import { Column, ColumnOptions } from '@antv/g2plot'

export interface GroupedColumnProps extends ColumnOptions {
  title?: string
}

function GroupedColumn(props: GroupedColumnProps) {
  const { title, data, ...restProps } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<Column>()

  useEffect(() => {
    return () => {
      chartRef.current?.destroy()
      chartRef.current = undefined
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current && restProps && data.length) {
      chartRef.current = new Column(containerRef.current as HTMLDivElement, {
        data,
        ...restProps,
      })
      chartRef.current.render()
    }

    if (chartRef.current) {
      chartRef.current.changeData(data)
      chartRef.current.update({
        ...restProps,
      })
    }
  }, [data, restProps])

  return (
    <div className="p-4">
      <div ref={containerRef}></div>
      { title && <div className='mt-4 text-center text-xs text-base-content/50'>{title}</div>}
    </div>
  )
}

export default GroupedColumn
