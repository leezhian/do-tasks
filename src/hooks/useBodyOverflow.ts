/*
 * @Author: kim
 * @Date: 2023-07-24 19:08:57
 * @Description: 设置body的overflow
 */
import { useEffect } from 'react'
import { setBodyOverflow } from '@/utils/utils'

export function useBodyOverflow(overflow: boolean) {
  useEffect(() => {
    setBodyOverflow(overflow)
  }, [overflow])
}