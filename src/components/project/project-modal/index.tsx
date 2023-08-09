/*
 * @Author: kim
 * @Date: 2023-08-09 14:48:17
 * @Description:
 */
import { useEffect, useState } from 'react'
import type { ChangeEventHandler } from 'react'
import { validate, isNotEmpty, minLength, maxLength } from '@/helpers/validator'
import Modal from '@/components/shared/modal'
import Toast from '@/components/shared/toast'

export interface ProjectModalProps {
  title?: string
  open?: boolean
  clearOnClose?: boolean
  onCancel?: () => void
  onOk?: (projectName: string) => void
}

const ProjectModal = (props: ProjectModalProps) => {
  const { title, open, onCancel, onOk, clearOnClose = false } = props
  const [projectName, setProjectName] = useState('')

  useEffect(() => {
    if (clearOnClose && !open) {
      setProjectName('')
    }
  }, [])

  const handleProjectNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setProjectName(e.target.value)
  }

  const handleOk = () => {
    const errorMsg = validate(projectName, [
      isNotEmpty('项目名称不能为空'),
      minLength(1, '项目名称不能少于1个字符'),
      maxLength(30, '项目名称不能超过30个字符'),
    ])

    if (errorMsg) {
      Toast.error(errorMsg)
      return
    }

    onOk && onOk(projectName)
  }

  return (
    <Modal
      wrapClassName="!w-96"
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <form>
        <input
          type="text"
          placeholder="输入项目名称"
          value={projectName}
          onChange={handleProjectNameChange}
          maxLength={30}
          className="daisy-input daisy-input-bordered daisy-input-md w-full"
        />
      </form>
    </Modal>
  )
}

export default ProjectModal
