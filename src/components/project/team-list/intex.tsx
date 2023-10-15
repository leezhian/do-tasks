/*
 * @Author: kim
 * @Date: 2023-07-22 01:12:46
 * @Description: 团队列表
 */
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { PlusIcon } from '@heroicons/react/24/outline'
import TeamModal from '@/components/project/team-modal'
import { _post, _get, _delete } from '@/helpers/request'
import Toast from '@/components/shared/toast'
import List from '@/components/shared/list'
import Modal from '@/components/shared/modal'
import TeamItem from './item'
import './index.scss'

export interface TeamItem {
  team_id: string
  name: string
}

function fetchTeamList() {
  return _get<TeamItem[]>('/team/list')
}

function fetchDeleteTeam(teamId: string) {
  return _delete(`/team/${teamId}`)
}

function TeamList() {
  const navigate = useNavigate()
  const { teamId } = useParams()
  const [showAddTeamModal, setShowAddTeamModal] = useState(false)
  const [teamList, setTeamList] = useState<TeamItem[]>([])
  const { runAsync: getTeamList, loading } = useRequest(fetchTeamList, {
    manual: true,
  })

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
      const res = await _post<TeamItem>('/team/create', {
        name: teamName,
        merbers: teamMembers.join(','),
      })

      setTeamList((prev) => [res, ...prev])
      Toast.success('创建成功')
      setShowAddTeamModal(false)
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  const handleDelTeam = (teamInfo: TeamItem) => {
    if(!teamInfo.team_id) return
    Modal.confirm({
      title: '确定删除该团队吗？',
      content: '删除后将无法恢复，且该团队下所有项目将丢失！',
      onOk: async () => {
        try {
          await fetchDeleteTeam(teamInfo.team_id)
          setTeamList((prev) => prev.filter((item) => item.team_id !== teamInfo.team_id))
          Toast.success('删除成功')
        } catch (error) {
          Toast.error('删除失败')
        }
      },
    })
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
        onDelete={handleDelTeam}
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

      <div className="relative mt-4 grow overflow-y-scroll scroll-smooth p-2 pt-0">
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
