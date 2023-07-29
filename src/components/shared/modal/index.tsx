/*
 * @Author: kim
 * @Date: 2023-07-23 18:40:45
 * @Description: 模态框
 */
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import type {
  ReactNode,
  MouseEvent,
  ButtonHTMLAttributes,
  CSSProperties,
} from 'react'
import confirm, { ModalFuncProps, withConfirm, withInfo, withError, withSuccess, withWarn } from './confirm'

export interface ModalProps {
  open?: boolean
  destroyOnClose?: boolean
  showCloseIcon?: boolean
  onClose?: (e: MouseEvent<HTMLButtonElement> | Event) => void
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
}

let closeTimer: NodeJS.Timeout | null = null

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
    onClose,
  } = props
  const modalRef = useRef<HTMLDialogElement>(null)
  const [innerOpen, setInnerOpen] = useState(open)

  const cancelListener = (e: MouseEvent<HTMLButtonElement> | Event) => {
    e.preventDefault()
    onClose && onClose(e)
  }

  const closeListener = () => {
    if (destroyOnClose) {
      removeListener()
      // 为了保留动画
      closeTimer = setTimeout(() => {
        setInnerOpen(false)
      }, 200)
      return
    }
    setInnerOpen(false)
  }

  const addListener = () => {
    modalRef.current?.addEventListener('cancel', cancelListener)
    modalRef.current?.addEventListener('close', closeListener)
  }

  const removeListener = () => {
    modalRef.current?.removeEventListener('cancel', cancelListener)
    modalRef.current?.removeEventListener('close', closeListener)
  }

  useEffect(() => {
    addListener()

    return () => {
      removeListener()
    }
  }, [])

  useLayoutEffect(() => {
    if (!modalRef.current) return

    // 同样为了保留动画
    if (innerOpen) {
      modalRef.current?.showModal()
    }
  }, [innerOpen])

  useEffect(() => {
    if (!modalRef.current) return
    if (open) {
      if (destroyOnClose) {
        closeTimer && clearTimeout(closeTimer)
        closeTimer = null
        addListener()
      }
      setInnerOpen(open)
    } else {
      modalRef.current?.close()
    }
  }, [open, destroyOnClose])

  return createPortal(
    <>
      {(!destroyOnClose || open || innerOpen) && (
        <dialog ref={modalRef} className="daisy-modal">
          <div className={`daisy-modal-box w-130 max-w-modal ${wrapClassName}`}>
            {showCloseIcon && (
              <button
                className="daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
            )}
            <h3 className="mb-2 text-lg font-bold">{title}</h3>
            <div style={bodyStyle}>{children}</div>
            {footer === undefined && (
              <div className="daisy-modal-action">
                <button
                  className="daisy-btn daisy-btn-sm"
                  {...cancelButtonProps}
                  onClick={onClose}
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
          </div>
        </dialog>
      )}
    </>,
    document.body,
  )
}

Modal.confirm = function(props: ModalFuncProps) {
  return confirm(withConfirm(props))
}

Modal.info = function(props: ModalFuncProps) {
  return confirm(withInfo(props))
}

Modal.success = function(props: ModalFuncProps) {
  return confirm(withSuccess(props))
}

function confirmWarn(props: ModalFuncProps) {
  return confirm(withWarn(props))
}

Modal.warn = confirmWarn
Modal.warning = confirmWarn

Modal.error = function(props: ModalFuncProps) {
  return confirm(withError(props))
}


export default Modal
