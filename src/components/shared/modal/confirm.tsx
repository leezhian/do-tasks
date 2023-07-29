/*
 * @Author: kim
 * @Date: 2023-07-29 11:05:52
 * @Description:
 */
import { createRoot } from 'react-dom/client'
import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react'
import Dialog from './dialog'

export enum ConfirmType {
  Confirm = 'confirm',
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export interface ModalFuncProps {
  className?: string
  open?: boolean
  title?: ReactNode
  content?: ReactNode
  onOk?: (...args: any[]) => any
  onCancel?: (...args: any[]) => any
  afterClose?: () => void
  close?: (...args: any[]) => any
  okButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  cancelButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  okText?: ReactNode
  cancelText?: ReactNode
  confirmLoading?: boolean
  wrapClassName?: string
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm'
  footer?: ReactNode
  destroyOnClose?: boolean
  bodyStyle?: CSSProperties
}

export default function confim(config: ModalFuncProps) {
  const container = document.createElement('div')
  const root = createRoot(container)
  let currentConfig = { ...config, close, open: true }
  let timeoutId: NodeJS.Timeout

  // 销毁
  function destory(...args: any[]) {
    if (config.onCancel) {
      config.onCancel(...args)
    }

    root.unmount()
    document.body.removeChild(container)
  }

  // 渲染
  function render(dialogConfig: ModalFuncProps) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      root.render(<Dialog {...dialogConfig} />)
      if (dialogConfig.open) {
        document.body.appendChild(container)
      }
    })
  }

  // 关闭
  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose()
        }
        destory(args)
      },
    }

    render(currentConfig)
  }

  // 更新
  function update(configUpdate: ModalFuncProps) {
    currentConfig = {
      ...currentConfig,
      ...configUpdate,
    }
    render(currentConfig)
  }

  render(currentConfig)

  return {
    destory: close,
    update,
  }
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'warning',
  }
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'info',
  }
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'success',
  }
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'error',
  }
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'confirm',
  }
}
