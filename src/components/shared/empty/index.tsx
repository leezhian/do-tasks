/*
 * @Author: kim
 * @Date: 2023-07-22 14:01:08
 * @Description: 空状态
 */
import { useMemo, isValidElement } from 'react'
import type { ReactNode, CSSProperties } from 'react'

export interface EmptyProps {
  description?: ReactNode
  image?: ReactNode
  imageStyle?: CSSProperties
}

function Empty(props: EmptyProps) {
  const { description, image, imageStyle } = props

  const imgNode = useMemo(() => {
    if (typeof image === 'string') {
      return (
        <img
          className="inline h-full align-middle"
          src={image}
          alt="empty"
          draggable={false}
        />
      )
    } else if (isValidElement(image)) {
      return image
    }
  }, [image, imageStyle])

  return (
    <div className="select-none text-center text-sm text-neutral-content">
      <div className="h-20" style={imageStyle}>
        {imgNode}
      </div>
      <div>{description}</div>
    </div>
  )
}

export default Empty
