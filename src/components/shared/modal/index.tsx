/*
 * @Author: kim
 * @Date: 2023-07-30 22:29:56
 * @Description: 模态框
 */
import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type {
  ReactNode,
  MouseEvent,
  ButtonHTMLAttributes,
  CSSProperties,
} from 'react'
import { useKeyPress } from 'ahooks'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeVariants } from '@/helpers/variants'
import Mask from '@/components/shared/mask'
import confirm, {
  ModalFuncProps,
  withConfirm,
  withInfo,
  withError,
  withSuccess,
  withWarn,
} from './confirm'

export interface ModalProps {
  open?: boolean
  destroyOnClose?: boolean
  showCloseIcon?: boolean
  onCancel?: (e: MouseEvent<HTMLButtonElement> | Event) => void
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void
  okText?: ReactNode
  cancelText?: ReactNode
  title?: ReactNode
  children?: ReactNode
  confirmLoading?: boolean
  wrapClassName?: string
  bodyStyle?: CSSProperties
  okButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  cancelButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  footer?: ReactNode
  keyboard?: boolean
}

function Modal(props: ModalProps) {
  const {
    children,
    wrapClassName,
    bodyStyle,
    open = false,
    destroyOnClose = false,
    title,
    footer,
    showCloseIcon = true,
    okText = '确定',
    confirmLoading = false,
    okButtonProps,
    cancelText = '取消',
    cancelButtonProps,
    onOk,
    onCancel,
    keyboard = true,
  } = props
  const [animateState, setAnimateState] = useState(open)
  const [innerOpen, setInnerOpen] = useState(open)
  useKeyPress(['esc'], (e) => {
    if (keyboard) {
      onCancel && onCancel(e)
    }
  })

  const handleModalAnimationStart = () => {
    setAnimateState(true)
  }
  const handleModalAnimationComplete = () => {
    setAnimateState(false)
    if (destroyOnClose && !open) {
      setInnerOpen(false)
    }
  }

  const classes = useMemo(() => {
    const cls = [
      'relative left-1/2 top-1/2 max-h-modal w-130 max-w-modal -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-2xl bg-base-100 p-6 shadow-2xl',
    ]

    if (!animateState && !open) {
      cls.push('hidden')
    }

    if (wrapClassName) {
      cls.push(wrapClassName)
    }

    return cls.join(' ')
  }, [animateState, open, wrapClassName])

  useEffect(() => {
    if (destroyOnClose) {
      if (open) {
        setInnerOpen(true)
      }
    } else {
      setInnerOpen(open)
    }
  }, [open])

  return createPortal(
    <>
      {(!destroyOnClose || innerOpen) && (
        <div>
          <Mask show={open} />
          <AnimatePresence>
            <div
              className={`fixed inset-0 z-90 ${
                animateState || open ? '' : 'hidden'
              }`}
            >
              {/* modal 主体 start */}
              <motion.div
                initial="fadeOut"
                variants={fadeVariants}
                animate={open ? 'fadeIn' : 'fadeOut'}
                exit="fadeOut"
                transition={{ duration: 0.2 }}
                className={classes}
                onAnimationStart={handleModalAnimationStart}
                onAnimationComplete={handleModalAnimationComplete}
              >
                {showCloseIcon && (
                  <button
                    className="daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2"
                    onClick={onCancel}
                  >
                    ✕
                  </button>
                )}
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <div style={bodyStyle}>{children}</div>
                {/* model footer start */}
                {footer === undefined && (
                  <div className="daisy-modal-action">
                    <button
                      className="daisy-btn daisy-btn-sm"
                      {...cancelButtonProps}
                      onClick={onCancel}
                    >
                      {cancelText}
                    </button>
                    <button
                      className="daisy-btn daisy-btn-primary daisy-btn-sm"
                      {...okButtonProps}
                      onClick={onOk}
                    >
                      {confirmLoading && (
                        <span className="daisy-loading daisy-loading-spinner daisy-loading-xs"></span>
                      )}
                      {okText}
                    </button>
                  </div>
                )}
                {/* model footer end */}
              </motion.div>
              {/* modal 主体 end */}
            </div>
          </AnimatePresence>
        </div>
      )}
    </>,
    document.body,
  )
}

Modal.confirm = function (props: ModalFuncProps) {
  return confirm(withConfirm(props))
}

Modal.info = function (props: ModalFuncProps) {
  return confirm(withInfo(props))
}

Modal.success = function (props: ModalFuncProps) {
  return confirm(withSuccess(props))
}

function confirmWarn(props: ModalFuncProps) {
  return confirm(withWarn(props))
}

Modal.warn = confirmWarn
Modal.warning = confirmWarn

Modal.error = function (props: ModalFuncProps) {
  return confirm(withError(props))
}

export default Modal
