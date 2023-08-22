/*
 * @Author: kim
 * @Date: 2023-07-24 19:08:57
 * @Description: 设置body的overflow
 */
import { useEffect, useRef } from 'react'
import BodyOverflowUpdater from '@/helpers/body-overflow-manager'

export function useBodyOverflow(overflow: boolean) {
  const updater = useRef<BodyOverflowUpdater>()

  useEffect(() => {
    if(!updater.current) {
      updater.current = new BodyOverflowUpdater()
    }

    return () => {
      updater.current?.destroy()
      updater.current = undefined
    }
  }, [])

  useEffect(() => {
    updater.current?.setOverflow(overflow)
  }, [overflow])
}