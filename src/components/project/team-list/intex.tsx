/*
 * @Author: kim
 * @Date: 2023-07-22 01:12:46
 * @Description: 团队列表
 */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { PlusIcon } from '@heroicons/react/24/outline'
import TeamModal from '@/components/project/team-modal'
import { _post, _get } from '@/helpers/request'
import Toast from '@/components/shared/toast'
import List from '@/components/shared/list'
import TeamItem from './item'
import './index.scss'

export interface TeamItem {
  team_id: string
  name: string
}

function fetchTeamList() {
  return _get<TeamItem[]>('/team/list')
}

function TeamList() {
  const navigate = useNavigate()
  const { teamId } = useParams()
  const [showAddTeamModal, setShowAddTeamModal] = useState(false)
  const [teamList, setTeamList] = useState<TeamItem[]>([])
  const { runAsync: getTeamList, loading } = useRequest(fetchTeamList, { manual: true })

  useEffect(() => {
    getTeamList().then((res) => {
      setTeamList(res)
    })
  }, [])

  // 切换团队
  const handleToggleTeam = useCallback(
    (teamInfo: TeamItem) => {
      if (teamId === teamInfo.team_id) return
      navigate(`/${teamInfo.team_id}`)
    },
    [teamId],
  )

  // 创建团队
  const handleCreateTeam = async (teamName: string, teamMembers: string[]) => {
    try {
      const res =  await _post<TeamItem>('/team/create', {
        name: teamName,
        merbers: teamMembers.join(',')
      })

      setTeamList((prev) => [res, ...prev])
      Toast.success('创建成功')
      setShowAddTeamModal(false)
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  const renderTeamItem = (item: TeamItem) => {
    return (
      <TeamItem
        className={`dt-team-list-item ${
          teamId === item.team_id ? 'active' : ''
        }`}
        data={item}
        key={item.team_id}
        onClick={handleToggleTeam}
      />
    )
  }

  return (
    <>
      <div className="flex shrink-0 items-center justify-between px-4 font-semibold">
        <h3 className="text-base font-semibold">团队</h3>
        <div className="sm:tooltip sm:tooltip-bottom" data-tip="创建团队">
          <button
            className="daisy-btn daisy-btn-ghost daisy-btn-xs"
            onClick={() => setShowAddTeamModal(true)}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grow overflow-y-scroll scroll-smooth p-2 pt-0">
        <List
          className="text-sm"
          loading={loading}
          dataSource={teamList}
          renderItem={renderTeamItem}
        />
      </div>

      <TeamModal
        title="添加团队"
        open={showAddTeamModal}
        onOk={handleCreateTeam}
        onCancel={() => setShowAddTeamModal(false)}
        clearOnClose
      />
    </>
  )
}

export default TeamList
