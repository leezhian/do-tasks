/*
 * @Author: kim
 * @Date: 2023-08-11 15:33:59
 * @Description:
 */
import { useMemo } from 'react'
import { Select, SelectProps } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { _get } from '@/helpers/request'

interface Member {
  uid: string
  name: string
  avatar: string
  phone: string
}

function fetchMembers(teamId: string) {
  return _get<Member[]>('/team/members', {
    team_id: teamId,
  })
}

export interface MemberSelectProps extends SelectProps {
}

function MemberSelect(props: MemberSelectProps) {
  const { teamId } = useParams()
  const { loading, data } = useRequest(() => fetchMembers(teamId ?? ''), {
    refreshDeps: [teamId],
  })

  const options = useMemo(() => {
    return (data ?? []).map((item) => ({
      label: item.name,
      value: item.uid,
    }))
  }, [data])

  return (
    <Select
      {...props}
      options={options}
      showArrow={false}
      notFoundContent={
        loading ? (
          <div className="py-2 text-center">
            <span className="daisy-loading daisy-loading-dots daisy-loading-sm"></span>
          </div>
        ) : null
      }
    />
  )
}

export default MemberSelect
