/*
 * @Author: kim
 * @Date: 2023-08-22 19:28:37
 * @Description: 属性列表项
 */
import { useMemo } from 'react'
import type { ReactNode } from 'react'

export interface PropertyItemProps {
  icon?: ReactNode
  label?: string
  children?: ReactNode
  labelCol?: string | number
}

function PropertyItem(props: PropertyItemProps) {
  const { icon, label, children, labelCol } = props

  const styles = useMemo(() => {
    if(labelCol === undefined || labelCol === null) return {}

    if(typeof labelCol === 'string') {
      return {
        width: isNaN(Number(labelCol)) ? labelCol : `${labelCol}px`
      }
    } else if(typeof labelCol === 'number') {
      return {
        width: `${labelCol}px`
      }
    }
  }, [labelCol])

  return (
    <div className="flex items-center space-x-2 text-xs ">
      <div className="flex items-center text-base-content/60" style={styles}>
        {icon && <span className="mr-1">{icon}</span>}
        <span>{label}</span>
      </div>
      {children}
    </div>
  )
}

export default PropertyItem
