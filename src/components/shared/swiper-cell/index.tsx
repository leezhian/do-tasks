/*
 * @Author: kim
 * @Date: 2023-10-15 16:27:34
 * @Description: 滑块单元格
 */
import { useEffect, useState, useRef, useId } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { browser } from '@/utils/utils'
import swiperObserver from './swiper-observer'

export interface SwiperCellProps {
  children?: ReactNode
  right?: ReactNode
}

function SwiperCell(props: SwiperCellProps) {
  const { children, right } = props
  const swiperId = useId()
  const swiperCellRef = useRef<HTMLDivElement>(null)
  const rightAreaRef = useRef<HTMLDivElement>(null)
  const isTap = useRef(false)
  const startX = useRef(0)
  const [moveDistance, setMoveDistance] = useState(0)

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    if (!right) return
    isTap.current = true
    swiperObserver.sync(swiperId)
    startX.current = browser.versions.mobile
      ? (e as TouchEvent).changedTouches[0].pageX
      : (e as MouseEvent).pageX
  }

  const handleMouseUp = () => {
    if(!isTap.current) return
    isTap.current = false
    const rightAreaWidth = rightAreaRef.current?.offsetWidth ?? 0
    setMoveDistance((d) => (d > -rightAreaWidth * 0.1 ? 0 : -rightAreaWidth))
    startX.current = 0
  }

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isTap.current) return

    const rightAreaWidth = rightAreaRef.current?.offsetWidth ?? 0
    const currentX =
      (browser.versions.mobile
        ? (e as TouchEvent).changedTouches[0].pageX
        : (e as MouseEvent).pageX) ?? 0
    const distance = Math.max(
      Math.min(currentX - startX.current, 0),
      -rightAreaWidth,
    )
    setMoveDistance(distance)
  }

  const autoShrink = () => {
    setMoveDistance(0)
  }

  useEffect(() => {
    const downEvent = browser.versions.mobile ? 'touchstart' : 'mousedown'
    const upEvent = browser.versions.mobile ? 'touchend' : 'mouseup'
    const moveEvent = browser.versions.mobile ? 'touchmove' : 'mousemove'

    swiperCellRef.current?.addEventListener(downEvent, handleMouseDown as any)
    document.addEventListener(upEvent, handleMouseUp as any)
    swiperCellRef.current?.addEventListener(moveEvent, handleMouseMove as any)

    return () => {
      swiperCellRef.current?.removeEventListener(
        downEvent,
        handleMouseDown as any,
      )
      document.removeEventListener(upEvent, handleMouseUp as any)
      swiperCellRef.current?.removeEventListener(
        moveEvent,
        handleMouseMove as any,
      )
    }
  }, [])

  useEffect(() => {
    swiperObserver.listen(swiperId, autoShrink)

    return () => {
      swiperObserver.remove(swiperId)
    }
  }, [swiperId])

  return (
    <div className="relative overflow-hidden">
      <div
        ref={swiperCellRef}
        className="select-none duration-500"
        style={{ transform: `translate3d(${moveDistance}px, 0, 0)` }}
      >
        <div className="relative w-full overflow-hidden">{children}</div>
        {right && (
          <div
            ref={rightAreaRef}
            className="absolute right-0 top-0 h-full translate-x-full"
          >
            {right}
          </div>
        )}
      </div>
    </div>
  )
}

export default SwiperCell
