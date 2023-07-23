/*
 * @Author: kim
 * @Date: 2023-07-23 19:53:37
 * @Description: 对话框
 */
import { useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent } from 'react'
import {
  ExclamationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'
import type { BaseModalProps } from './index'

export enum ConfirmType {
  Confirm = 'confirm',
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export interface ConfirmProps extends BaseModalProps {
  type?: 'confirm' | 'info' | 'success' | 'error' | 'warning'
}

function Confirm(props: ConfirmProps) {
  const {
    children,
    open = false,
    wrapClassName,
    bodyStyle,
    title,
    footer,
    okText = '确定',
    confirmLoading = false,
    okButtonProps,
    cancelText = '取消',
    cancelButtonProps,
    onOk,
    onClose,
    type = ConfirmType.Confirm,
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
    if (open) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [open])

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

  return createPortal(
    <dialog ref={modalRef} className="modal">
      <div className={`modal-box w-96 max-w-modal ${wrapClassName}`}>
        <h3 className="mb-2 flex items-center text-lg font-bold">
          {icon}
          {title}
        </h3>
        <div className="ml-8" style={bodyStyle}>
          {children}
        </div>
        {footer === undefined && (
          <div className="modal-action mt-2">
            {type === ConfirmType.Confirm && (
              <button
                className="btn btn-sm"
                {...cancelButtonProps}
                onClick={onClose}
              >
                {cancelText}
              </button>
            )}
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

export default Confirm
