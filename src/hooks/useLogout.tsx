/*
 * @Author: kim
 * @Date: 2023-07-23 23:52:35
 * @Description: 退出登录hooks
 */
import { useState, useCallback, useMemo } from "react"
import Modal from "@/components/shared/modal"

export function useLogout(confirmCallback: () => void) {
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false)

  const show = useCallback(() => {
    setLogoutConfirmVisible(true)
  }, [])

  const hide = useCallback(() => {
    setLogoutConfirmVisible(false)
  }, [])

  const handleConfirm = async () => {
    await confirmCallback()
    hide()
  }

  const confirmNode = useMemo(() => {
    return <Modal.Confirm title="确定退出登录吗？" open={logoutConfirmVisible} onClose={hide} onOk={handleConfirm}></Modal.Confirm>
  }, [logoutConfirmVisible, show, hide])

  return {
    show,
    logoutModal: confirmNode
  }
}