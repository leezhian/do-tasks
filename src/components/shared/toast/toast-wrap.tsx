/*
 * @Author: kim
 * @Date: 2023-07-25 14:40:31
 * @Description:
 */
import { AnimatePresence } from 'framer-motion'
import Toast, { ToastProps } from '@/components/shared/toast/toast'

export interface ToastWrapProps {
  list?: ToastProps[]
  onExitComplete?: () => void
}

function ToastWrap({ list = [], onExitComplete }: ToastWrapProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {list.map((item, index) => {
        return <Toast key={index} {...item} />
      })}
    </AnimatePresence>
  )
}

export default ToastWrap
