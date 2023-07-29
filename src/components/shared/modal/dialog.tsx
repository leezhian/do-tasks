/*
 * @Author: kim
 * @Date: 2023-07-23 19:53:37
 * @Description: 对话框
 */
import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ExclamationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'
import Mask from '@/components/shared/mask'
import { ModalFuncProps, ConfirmType } from './confirm'

function Dialog(props: ModalFuncProps) {
  const {
    open = false,
    wrapClassName,
    bodyStyle,
    content,
    title,
    footer,
    okText = '确定',
    confirmLoading = false,
    okButtonProps,
    cancelText = '取消',
    cancelButtonProps,
    afterClose,
    close,
    onOk,
    type = ConfirmType.Confirm,
  } = props

  const handleExitComplete = () => {
    if (!open) {
      afterClose && afterClose()
    }
  }

  const handleOk = () => {
    onOk && onOk()
    close && close()
  }

  const handleCancel = () => {
    close && close()
  }

  const icon = useMemo(() => {
    const baseClasses = 'h-6 w-6 mr-2'

    switch (type) {
      case ConfirmType.Info:
        return <ExclamationCircleIcon className={`${baseClasses} text-info`} />
      case ConfirmType.Success:
        return <CheckCircleIcon className={`${baseClasses} text-success`} />
      case ConfirmType.Error:
        return <XCircleIcon className={`${baseClasses} text-error`} />
      case ConfirmType.Confirm:
      case ConfirmType.Warning:
        return (
          <ExclamationCircleIcon className={`${baseClasses} text-warning`} />
        )
      default:
        return
    }
  }, [type])

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {open && (
        <>
          <Mask show={open} />
          <div className="fixed inset-0 z-infinity">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`m-auto mt-24 w-96 max-w-modal rounded-2xl bg-base-100 p-6 shadow-2xl ${wrapClassName}`}
            >
              <h3 className="mb-2 flex items-center text-lg font-bold">
                {icon}
                {title}
              </h3>
              <div className="ml-8" style={bodyStyle}>
                {content}
              </div>
              {footer === undefined && (
                <div className="mt-2 flex justify-end space-x-2">
                  {type === ConfirmType.Confirm && (
                    <button
                      className="daisy-btn daisy-btn-sm"
                      {...cancelButtonProps}
                      onClick={handleCancel}
                    >
                      {cancelText}
                    </button>
                  )}
                  <button
                    className="daisy-btn daisy-btn-primary daisy-btn-sm"
                    {...okButtonProps}
                    onClick={handleOk}
                  >
                    {confirmLoading && (
                      <span className="daisy-loading daisy-loading-spinner daisy-loading-xs"></span>
                    )}
                    {okText}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Dialog
