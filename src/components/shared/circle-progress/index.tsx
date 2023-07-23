/*
 * @Author: kim
 * @Date: 2023-07-22 21:21:16
 * @Description: 圆形进度条
 */
import { useCallback } from 'react'

export interface CircleProgressProps {
  className?: string
  percent?: number
  strokeColor?: string
  secPercent?: number
  showInfo?: boolean
  format?: (percent: number, secPercent: number) => string
}

const strokeLength = 295.3 // 划线长度
const circleBaseStyle = {
  strokeDasharray: `${strokeLength + 0.01}px, ${strokeLength + 0.01}`,
  transform: 'rotate(-90deg)',
  transformOrigin: '0px 0px',
  transition:
    'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s',
  fillOpacity: 0,
}

// 默认模板函数
const defaultFormat = (percent: number) => {
  return `${percent}%`
}

function CircleProgress(props: CircleProgressProps) {
  const {
    percent = 0,
    secPercent = 0,
    className,
    format = defaultFormat,
    showInfo = true,
  } = props

  const computedDashoffset = useCallback((p: number) => {
    return ((100 - p) / 100) * strokeLength // 计算缺口长度
  }, [])

  return (
    <div
      className={`relative h-20 w-20 overflow-hidden rounded-full ${className}`}
    >
      <svg viewBox="-50 -50 100 100" role="presentation">
        <circle
          className="stroke-base-200"
          r="47"
          cx="0"
          cy="0"
          strokeLinecap="round"
          strokeWidth="6"
          style={{
            ...circleBaseStyle,
            strokeDashoffset: 0,
          }}
        ></circle>
        <circle
          className="stroke-info"
          r="47"
          cx="0"
          cy="0"
          strokeLinecap="round"
          strokeWidth="6"
          opacity="1"
          style={{
            ...circleBaseStyle,
            strokeDashoffset: computedDashoffset(percent),
          }}
        ></circle>

        {secPercent > 0 && (
          <circle
            className="stroke-error"
            r="47"
            cx="0"
            cy="0"
            strokeLinecap="round"
            strokeWidth="6"
            opacity="1"
            style={{
              ...circleBaseStyle,
              strokeDashoffset: computedDashoffset(secPercent),
            }}
          ></circle>
        )}
      </svg>
      {showInfo && (
        <span className="absolute start-0 w-full -translate-y-1/2 text-center [inset-block-start:50%]">
          {format(percent, secPercent)}
        </span>
      )}
    </div>
  )
}

export default CircleProgress
