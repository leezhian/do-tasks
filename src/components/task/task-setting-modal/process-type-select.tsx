/*
 * @Author: kim
 * @Date: 2023-08-10 18:24:27
 * @Description: 流程类型选择器
 */
import { useState, memo } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { _get, _post, _delete } from '@/helpers/request'
import Modal from '@/components/shared/modal'
import SearchSelect from '@/components/shared/search-select'
import Toast from '@/components/shared/toast'

export interface ProcessType {
  id: number
  name: string
}

interface ProcessTypeOption {
  label: string
  value: number
}

function fetchProcessType(teamId: string) {
  return _get<ProcessType[]>('/process-type/list', {
    team_id: teamId,
  })
}

function createProcessType(teamId: string, name: string) {
  return _post<ProcessType>('/process-type/create', {
    team_id: teamId,
    name: name,
  })
}

function deleteProcessType(projectTypeId: number) {
  return _delete<ProcessType>(`/process-type/${projectTypeId}`)
}

export interface ProcessTypeSelectProps {
  status?: 'error' | 'warning'
  value?: string | number
  onChange?: (value: any, option: ProcessTypeOption) => void
}

const ProcessTypeSelect = memo((props: ProcessTypeSelectProps) => {
  const { value, onChange, status } = props
  const { teamId } = useParams()
  // const [value, setValue] = useState<any>()
  const [processTypeList, setProcessTypeList] = useState<ProcessTypeOption[]>(
    [],
  )
  const { loading } = useRequest(() => fetchProcessType(teamId ?? ''), {
    onSuccess: (data) => {
      const temp = data.map((item) => ({
        label: item.name,
        value: item.id,
      }))
      setProcessTypeList(temp)
    },
    onError: (error: any) => {
      Toast.error(error.message)
    },
  })

  // 选中处理
  const handleSelect = async (value: string | number, option: any) => {
    try {
      if (value !== 'custom') {
        // setValue(value)
        onChange && onChange(value, option)
        return
      }
      const res = await createProcessType(teamId ?? '', option.label)
      const newOption = {
        label: res.name,
        value: res.id,
      }
      setProcessTypeList((prev) => {
        return [
          ...prev,
          newOption
        ]
      })

      // setValue(res.id)
      onChange && onChange(res.id, newOption)
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  // 删除选项处理
  const handleRemoveOption = (option: any) => {
    Modal.confirm({
      title: '确定删除该流程类型吗？',
      onOk: async () => {
        try {
          await deleteProcessType(option.value)
          if (value === option.value) {
            // setValue(undefined)
            onChange && onChange(undefined, {} as ProcessTypeOption)
          }
          setProcessTypeList((prev) => {
            return prev.filter((item) => item.value !== option.value)
          })
          Toast.success('删除成功')
        } catch (error: any) {
          Toast.error(error.message)
        }
      },
    })
  }

  return (
    <SearchSelect
      className="max-w-50"
      value={value}
      status={status}
      options={processTypeList}
      placeholder="自定义或选择流程类型"
      onChange={handleSelect}
      onRemove={handleRemoveOption}
    />
  )
})

export default ProcessTypeSelect
