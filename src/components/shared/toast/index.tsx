/*
 * @Author: kim
 * @Date: 2023-07-24 23:08:41
 * @Description: 吐司
 */
import { createRoot, Root } from 'react-dom/client'
import type { ReactNode } from 'react'
import { XCircleIcon, ExclamationCircleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { createHTMLElement } from '@/utils/utils'
import ToastWrap from '@/components/shared/toast/toast-wrap'
import {ToastProps} from '@/components/shared/toast/toast'

export type TypeOpen = (
  content: ReactNode,
  duration?: number,
  onClose?: VoidFunction,
) => void

type NoticeType = 'info' | 'success' | 'error' | 'warning'

interface ArgsProps {
  content: ReactNode
  duration?: number
  type?: NoticeType
  onClose?: () => void
  icon?: ReactNode
  key?: string | number
}

interface OpenTask {
  type: 'open',
  config: ArgsProps
  setCloseFn: (closeFn: VoidFunction) => void
}

interface TypeTask {
  type: NoticeType
  args: Parameters<TypeOpen>;
  setCloseFn: (closeFn: VoidFunction) => void
}

type Task = OpenTask | TypeTask | {
  type: 'destroy'
  key: string | number
}

let messageRoot: HTMLElement
let toastRoot: Root | null
let taskQueue: Task[] = []
let toastList: ToastProps[] = []

/**
 * @description: 表示所有toast都要关闭，需要进行移除dom
 * @return {void}
 */
function onExitComplete() {
  if(toastList.length > 0) return

  if(toastRoot) {
    toastRoot.unmount()
    toastRoot = null
  }

  if(messageRoot) {
    document.body.removeChild(messageRoot)
  }
}

/**
 * @description: 销毁通知
 * @param {React} key toast key
 * @return {void}
 */
function destroy(key: React.Key) {
  taskQueue.push({
    type: 'destroy',
    key,
  })
  flushNotice()
}

// 通知轮训
function flushNotice() {
  if (!messageRoot) {
    messageRoot = createHTMLElement('div', {
      class: 'zk-toast fixed z-50 top-10 left-1/2 w-full text-sm -translate-x-1/2 pointer-events-none'
    })
  }
  
  if(!toastRoot) {
    toastRoot = createRoot(messageRoot, {
      identifierPrefix: 'toast'
    })
    document.body.appendChild(messageRoot)
  }

  taskQueue.forEach(task => {
    const { type } = task

    switch (type) {
      case 'open':   
        // 打开
        task.config.key = task.config.key ?? Date.now()
        const closeFn = () => {
          destroy(task.config.key as number | string)
          task.config?.onClose && task.config?.onClose()
        }
        task.setCloseFn(closeFn)
        toastList.push({
          ...task.config,
          onClose: closeFn
        })
        break
      case 'destroy':
        const targetIndex = toastList.findIndex(item => item.key === task.key)
        if (targetIndex >=0 ) {
          toastList.splice(targetIndex, 1)
        }
        console.log(toastList);
        
        break
      default:

    }
  })
  toastRoot.render(<ToastWrap list={toastList} onExitComplete={onExitComplete} />)
  taskQueue = []
}

// 打开一个 toast
function open(config: ArgsProps) {
  let closeFn: VoidFunction

  const task: OpenTask = {
    type: 'open',
    config,
    setCloseFn: (fn) => {
      closeFn = fn
    }
  }

  taskQueue.push(task)
  flushNotice()

  return () => {
    if (closeFn) {
      closeFn()
    }
  }
}

/**
 * @description: toast 不同类型打开
 * @param {keyof} type toast类型
 * @param {Parameters} args
 * @return {void}
 */
function typeOpen(type: keyof MessageMethods, args: Parameters<TypeOpen>) {
  let closeFn: VoidFunction
  const [content, duration, onClose] = args
  let icon: ReactNode
  // 处理图标
  switch (type) {
    case 'success':
      icon = <CheckCircleIcon className="text-green-500" />
      break
    case 'info':
      icon = <InformationCircleIcon className="text-blue-500" />
      break
    case 'error':
      icon = <XCircleIcon className="text-red-500" />  
      break
    case 'warning':
      icon = <ExclamationCircleIcon className="text-amber-500" />
      break
  }

  const task: OpenTask = {
    type: 'open',
    config: {
      content,
      icon,
      duration,
      onClose
    },
    setCloseFn: (fn) => {
      closeFn = fn
    }
  }

  taskQueue.push(task)
  flushNotice()

  return () => {
    if (closeFn) {
      closeFn()
    }
  }
}

interface BaseMethods {
  open: (config: ArgsProps) => () => void
  destroy: (key: React.Key) => void
}

interface MessageMethods {
  info: TypeOpen
  success: TypeOpen
  error: TypeOpen
  warning: TypeOpen
}

const methods: (keyof MessageMethods)[] = ['success', 'info', 'warning', 'error']
const baseStaticMethods: BaseMethods = {
  open,
  destroy,
}
const staticMethods = baseStaticMethods as MessageMethods & BaseMethods;

methods.forEach((type: keyof MessageMethods) => {
  staticMethods[type] = (...args: Parameters<TypeOpen>) => typeOpen(type, args);
});

export default staticMethods
