/*
 * @Author: kim
 * @Date: 2023-08-08 22:56:28
 * @Description:
 */
import {
  useState,
  useMemo,
  ChangeEventHandler,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { Input, Select, Tag, Space } from 'antd'
import { useDebounceFn, useRequest } from 'ahooks'
import { _get } from '@/helpers/request'
import Modal from '@/components/shared/modal'
import Avatar from '@/components/shared/avatar'
import { isNotEmpty, maxLength, minLength, validate } from '@/helpers/validator'
import Toast from '@/components/shared/toast'

export interface TeamModalRef {
  setFieldsValue: (values: { teamName?: string, members?: any[] }) => void
}

export interface TeamModalProps {
  title?: string
  open?: boolean
  clearOnClose?: boolean // 因为数据是在当前组件，而 modal的销毁并不会影响当前组件的数据
  onCancel?: () => void
  onOk?: (teamName: string, memberIds: string[]) => void
}

export interface TeamMember {
  uid: string
  name: string
  avatar: string
  sex?: number // 看后续需不需要样式区别
}

interface SearchOption {
  label: string
  value: string
  avatar: string
  sex?: number
}

function fetchSearchUser(keyword: string) {
  return _get<TeamMember[]>('/user/search', { keyword })
}

const TeamModal = forwardRef<TeamModalRef, TeamModalProps>((props, ref) => {
  const { title, open, onCancel, onOk, clearOnClose = false } = props
  const [teamName, setTeamName] = useState<string>('')
  const {
    run,
    cancel,
    loading,
    data: searchList,
  } = useRequest(fetchSearchUser, { manual: true })
  const { run: search } = useDebounceFn(run, { wait: 2000 })
  // const [memberIds, setMemberIds] = useState<string[]>([])
  const [members, setMembers] = useState<any[]>([])

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValue: (values) => {
        const { teamName, members } = values
        if(teamName !== null && teamName !== undefined) {
          setTeamName(teamName)
        }
        if(members) {
          setMembers(members)
        }
      },
    }),
    [],
  )

  useEffect(() => {
    if (!open && clearOnClose) {
      setTeamName('')
      // setMemberIds([])
      setMembers([])
    }
  }, [clearOnClose, open])

  const handleTeamInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target
    setTeamName(value)
  }

  const searchOptions = useMemo(() => {
    return (searchList ?? []).map((item) => ({
      label: item.name,
      value: item.uid,
      avatar: item.avatar,
    }))
  }, [searchList])

  const handleSearch = (value: string) => {
    if (loading) {
      cancel()
    }
    search(value)
  }

  /**
   * @description: 选择团队成员
   * @param {string} value
   * @param {SearchOption} option
   * @return {void}
   */
  const handleSelectMember = (value: string, option: SearchOption) => {
    // setMemberIds([...memberIds, value])
    setMembers([...members, option])
  }

  /**
   * @description: 移除团队成员
   * @param {SearchOption} member
   * @return {void}
   */
  const handleRemoveMember = (member: SearchOption) => {
    // setMemberIds(memberIds.filter((id) => id !== member.value))
    setMembers(members.filter((item) => item.value !== member.value))
  }

  const handleOk = () => {
    const errorMsg = validate(teamName, [
      isNotEmpty('团队名称不能为空'),
      minLength(1, '团队名称不能少于1个字符'),
      maxLength(16, '团队名称不能超过16个字符'),
    ])

    if (errorMsg) {
      Toast.error(errorMsg)
      return
    }
    const memberIds = members.map(item => item.value)
    
    onOk && onOk(teamName, memberIds)
  }

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <div>
        <Input
          size="large"
          placeholder="输入团队名称"
          value={teamName}
          minLength={1}
          maxLength={16}
          onChange={handleTeamInput}
        />
        <div className="daisy-divider before:h-px after:h-px">可选</div>
        <Select
          className="w-full"
          size="large"
          placeholder="搜索添加团队人员"
          showSearch
          showArrow={false}
          filterOption={false}
          mode="multiple"
          loading={loading}
          value={members}
          options={searchOptions}
          onSearch={handleSearch}
          onSelect={handleSelectMember}
          notFoundContent={
            loading ? (
              <div className="py-2 text-center">
                <span className="daisy-loading daisy-loading-dots daisy-loading-sm"></span>
              </div>
            ) : null
          }
          maxTagCount={0}
        />
        <Space className="mt-2" wrap>
          {members.map((item) => (
            <Tag
              key={item.value}
              onClose={() => handleRemoveMember(item)}
              bordered={false}
              closable
            >
              <Avatar
                className="mr-1 h-6 w-6"
                url={item.avatar}
                name={item.label}
              />
              {item.label}
            </Tag>
          ))}
        </Space>
      </div>
    </Modal>
  )
})

export default TeamModal
