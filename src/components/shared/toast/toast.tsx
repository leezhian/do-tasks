/*
 * @Author: kim
 * @Date: 2023-07-25 10:58:20
 * @Description: 吐司组件
 */
import { useEffect, useRef, useId } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface ToastProps {
  key?: string | number
  content?: ReactNode
  duration?: number
  icon?: ReactNode
  direction?: 'top' | 'middle' | 'bottom'
  onClose?: () => void
}

function Toast(props: ToastProps) {
  const { content, duration = 3000, icon, onClose } = props
  const id = useId()
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (duration !== 0) {
      timer.current = setTimeout(() => {
        timer.current = null
        onClose && onClose()
      }, duration)
    }

    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [duration, onClose])

  return <motion.div
    key={id}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-2 text-center"
  >
      <div className="pointer-events-auto inline-block rounded-lg bg-base-100 px-2 py-3 shadow-toast">
        {icon && (
          <span className="inline-block h-4 w-4 align-text-bottom text-base leading-none [margin-inline-end:8px]">
            {icon}
          </span>
        )}
        <span>{content}</span>
      </div>
  </motion.div>
}

export default Toast
