/*
 * @Author: kim
 * @Date: 2023-07-23 18:40:45
 * @Description: 模态框
 */
import { useEffect, useRef } from 'react'
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

function Modal(props: ModalProps) {
  const {
    children,
    wrapClassName,
    bodyStyle,
    open = false,
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

  const cancelListener = (e: MouseEvent<HTMLButtonElement> | Event) => {
    e.preventDefault()
    onClose && onClose(e)
  }

  useEffect(() => {
    modalRef.current?.addEventListener('cancel', cancelListener)

    return () => {
      modalRef.current?.removeEventListener('cancel', cancelListener)
    }
  }, [])

  useEffect(() => {
    if (!modalRef.current) return
    
    if (open && !modalRef.current?.open) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [open])

  return createPortal(
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
    </dialog>,
    document.body,
  )
}

Modal.Confirm = Confirm

export default Modal
