/*
 * @Author: kim
 * @Date: 2023-08-22 19:28:45
 * @Description: 属性列表
 */
import { useMemo, cloneElement, isValidElement, Children } from 'react'
import type { ReactNode } from 'react'
import Item from './item'

interface PropertyListProps {
  className?: string
  children?: ReactNode
  labelCol?: string | number
}

function PropertyList(props: PropertyListProps) {
  const { children, className, labelCol } = props

  const list = useMemo(() => {
    if (labelCol === undefined || labelCol === null) return children

    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          labelCol,
          ...child.props,
        })
      }
      return child
    })
  }, [labelCol, children])

  return <div className={`space-y-2 ${className ?? ''}`}>{list}</div>
}

PropertyList.Item = Item

export default PropertyList
