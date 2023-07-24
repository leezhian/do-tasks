/*
 * @Author: kim
 * @Date: 2023-07-24 17:59:32
 * @Description: 监听窗口变化
 */

import { useEffect, useRef } from 'react';

export function useResize(fn: (e: UIEvent) => void) {
  const cb = useRef(fn)

  useEffect(() => {
    cb.current = fn
  }, [fn])

  // fix: 如果有依赖项的话，会导致每次依赖项变化都会重新绑定事件，除非fn使用了useCallback
  useEffect(() => {
    function resizeHandler(e: UIEvent) {
      cb.current(e)
    }
    window.addEventListener('resize', resizeHandler)
    window.dispatchEvent(new Event('resize'))

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])
}