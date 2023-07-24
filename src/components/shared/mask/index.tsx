/*
 * @Author: kim
 * @Date: 2023-07-24 18:42:55
 * @Description: 遮罩
 */
import type { ReactNode } from 'react'
import { useBodyOverflow } from '@/hooks'

export interface MaskProps {
  show?: boolean
  children?: ReactNode
  zIndex?: number
  onClick?: () => void
}

function Mask({ children, show = false, zIndex = 50, onClick }: MaskProps) {
  useBodyOverflow(show)

  return (
    <>
      {show && (
        <div style={{ zIndex: zIndex }}>
          <div className="absolute inset-0 overflow-hidden bg-black/30" onClick={onClick}></div>
          {children}
        </div>
      )}
    </>
  )
}

export default Mask
