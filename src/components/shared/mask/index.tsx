/*
 * @Author: kim
 * @Date: 2023-07-24 18:42:55
 * @Description: 遮罩
 */
import type { ReactNode } from 'react'
import { useBodyOverflow } from '@/hooks'
import { motion, AnimatePresence } from 'framer-motion'

export interface MaskProps {
  show?: boolean
  children?: ReactNode
  zIndex?: number
  onClick?: () => void
}

function Mask({ children, show = false, zIndex = 50, onClick }: MaskProps) {
  useBodyOverflow(show)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0'
          style={{ zIndex: zIndex }}
        >
          <div
            className="absolute inset-0 overflow-hidden bg-black/30"
            onClick={onClick}
          ></div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Mask
