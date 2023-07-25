/*
 * @Author: kim
 * @Date: 2023-07-23 19:53:37
 * @Description: 对话框（destroyOnClose 处理的不算好）
 */
import { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react'
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

let closeTimer: NodeJS.Timeout | null = null
export interface ConfirmProps extends BaseModalProps {
  type?: 'confirm' | 'info' | 'success' | 'error' | 'warning'
  destroyOnClose?: boolean
}

function Confirm(props: ConfirmProps) {
  const {
    children,
    open = false,
    destroyOnClose = false,
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
    <>
      {(!destroyOnClose || open || innerOpen) && (
        <dialog ref={modalRef} className="daisy-modal">
          <div className={`daisy-modal-box w-96 max-w-modal ${wrapClassName}`}>
            <h3 className="mb-2 flex items-center text-lg font-bold">
              {icon}
              {title}
            </h3>
            <div className="ml-8" style={bodyStyle}>
              {children}
            </div>
            {footer === undefined && (
              <div className="daisy-modal-action mt-2">
                {type === ConfirmType.Confirm && (
                  <button
                    className="daisy-btn daisy-btn-sm"
                    {...cancelButtonProps}
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                )}
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

export default Confirm
