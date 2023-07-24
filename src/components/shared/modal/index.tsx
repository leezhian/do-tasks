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
import Confirm from './confim'

export interface BaseModalProps {
  open?: boolean
  destroyOnClose?: boolean
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

export interface ModalProps extends BaseModalProps {
  showCloseIcon?: boolean
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
        <dialog ref={modalRef} className="modal">
          <div className={`modal-box w-130 max-w-modal ${wrapClassName}`}>
            {showCloseIcon && (
              <button
                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
            )}
            <h3 className="mb-2 text-lg font-bold">{title}</h3>
            <div style={bodyStyle}>{children}</div>
            {footer === undefined && (
              <div className="modal-action">
                <button
                  className="btn btn-sm"
                  {...cancelButtonProps}
                  onClick={onClose}
                >
                  {cancelText}
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  {...okButtonProps}
                  onClick={onOk}
                >
                  {confirmLoading && (
                    <span className="loading loading-spinner loading-xs"></span>
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

Modal.Confirm = Confirm

export default Modal