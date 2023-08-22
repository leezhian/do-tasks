/*
 * @Author: kim
 * @Date: 2023-08-22 16:14:21
 * @Description: 百分比
 */
import { useMemo } from 'react'

export function usePercent(value: number, total: number) {
  const percent = useMemo(() => {
    if (!value || !total) {
      return 0
    }
    
    return Math.floor((value / total) * 100)
  }, [value, total])

  return percent
}