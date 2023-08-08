/*
 * @Author: kim
 * @Date: 2023-07-22 01:12:46
 * @Description: 团队列表
 */
import { useCallback, useState } from 'react'
import { Select, Input } from 'antd'
import { PlusIcon } from '@heroicons/react/24/outline'
import './index.scss'
import TeamModal from '@/components/home/team-modal'
import Modal from '@/components/shared/modal'
import List from '@/components/shared/list'
import TeamItem from './item'

export interface ListProps {
  dataSource?: any[]
}

const demoList = [
  { id: 1, name: '团队1' },
  { id: 2, name: '团队2' },
  { id: 3, name: '团队3' },
  { id: 4, name: '团队4' },
  { id: 5, name: '团队5' },
  { id: 6, name: '团队6' },
  { id: 7, name: '团队7' },
  { id: 8, name: '团队8' },
  { id: 9, name: '团队9' },
  { id: 10, name: '团队10' },
]

function TeamList(props: ListProps) {
  const { dataSource = demoList } = props
  const [activeTeamId, setActiveTeamId] = useState<number | null>()
  const [showAddTeamModal, setShowAddTeamModal] = useState(false)

  const handleToggleTeam = useCallback(
    (teamInfo: any) => {
      if (activeTeamId === teamInfo.id) return
      // TODO 记录到store
      setActiveTeamId(teamInfo.id)
    },
    [activeTeamId],
  )

  const handleCreateTeam = () => {
    console.log('创建团队')
    setShowAddTeamModal(false)
  }

  const renderTeamItem = (item: any) => {
    return (
      <TeamItem
        className={`dt-team-list-item ${
          activeTeamId === item.id ? 'active' : ''
        }`}
        data={item}
        key={item.id}
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
          dataSource={dataSource}
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
