/*
 * @Author: kim
 * @Date: 2023-07-31 17:05:35
 * @Description: 悬浮消息
 */
import type { ReactNode } from 'react'

interface TipItem {
  label: string
  value: string | number | undefined
}

export interface FloatTipsProps {
  className?: string
  prefix?: ReactNode
  items?: TipItem[]
}

function FloatTips(props: FloatTipsProps) {
  const { className, prefix, items = [] } = props

  return (
    <div
      className={`float-tips fixed bottom-16 right-4 z-10 select-none space-x-3 rounded-full bg-base-100 px-4 py-1 text-xs shadow ${
        className ?? ''
      }`}
    >
      {prefix}
      {items.map((item) => (
        <div className="inline-block space-x-1" key={item.label}>
          <span className="text-base-content/60">{item.label}</span>
          <span className="text-base font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export default FloatTips
