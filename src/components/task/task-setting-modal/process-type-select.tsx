/*
 * @Author: kim
 * @Date: 2023-08-10 18:24:27
 * @Description: 流程类型选择器
 */
import { useState, useEffect, useMemo, memo, useCallback, useRef } from 'react'
import type { ChangeEventHandler, KeyboardEventHandler } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { _get, _post, _delete } from '@/helpers/request'
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

const options = [
  {
    label: '流程类型1',
    value: 1,
  },
  {
    label: '流程类型2',
    value: 2,
  },
]

export interface ProcessTypeSelectProps {
  value?: number
  onSelect?: (value: number, option: ProcessTypeOption) => void
}

const ProcessTypeSelect = memo((props: ProcessTypeSelectProps) => {
  // const { value, onSelect } = props
  const { teamId } = useParams()
  // const [searchValue, setSearchValue] = useState<string>('')
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

  // const handleSearch = (value: string) => {
  //   setSearchValue(value)
  // }

  // 创建流程类型
  // const handleCreateProcessType = useCallback(
  //   async (processTypeName: string) => {
  //     try {
  //       const res = await createProcessType(teamId ?? '', processTypeName)
  //       setProcessTypeList((prev) => {
  //         return [
  //           ...prev,
  //           {
  //             label: res.name,
  //             value: res.id,
  //           },
  //         ]
  //       })
  //     } catch (error: any) {
  //       Toast.error(error.message)
  //     }
  //   },
  //   [],
  // )

  // const notFoundContent = useMemo(() => {
  //   if (loading) {
  //     return (
  //       <div className="py-2 text-center">
  //         <span className="daisy-loading daisy-loading-dots daisy-loading-sm"></span>
  //       </div>
  //     )
  //   }

  //   if (searchValue) {
  //     return (
  //       <a
  //         className="daisy-btn daisy-btn-outline daisy-btn-sm w-full border-dashed text-center"
  //         onClick={() => handleCreateProcessType(searchValue)}
  //       >
  //         <span className="truncate">创建 {searchValue}</span>
  //       </a>
  //     )
  //   }
  //   return null
  // }, [loading, searchValue, handleCreateProcessType])

  return (
    <SearchSelect options={processTypeList} placeholder='自定义或选择流程类型' />
    // <Select
    //   showArrow={false}
    //   placeholder="自定义或选择流程类型"
    //   className="max-w-[200px]"
    //   showSearch
    //   notFoundContent={notFoundContent}
    //   options={processTypeList}
    //   onSearch={handleSearch}
    //   value={value}
    //   onSelect={onSelect}
    // />
  )
})

export default ProcessTypeSelect
