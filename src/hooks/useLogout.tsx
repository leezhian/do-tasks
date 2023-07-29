/*
 * @Author: kim
 * @Date: 2023-07-23 23:52:35
 * @Description: 退出登录hooks
 */
import { useCallback } from "react"
import Modal from "@/components/shared/modal"

export function useLogout(confirmCallback: () => void) {
  const show = useCallback(() => {
    Modal.confirm({
      title: '确定退出登录吗？',
      onOk: confirmCallback
    })
  }, [confirmCallback])

  return {
    show,
  }
}