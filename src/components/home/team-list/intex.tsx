/*
 * @Author: kim
 * @Date: 2023-07-22 01:12:46
 * @Description: 团队列表
 */
import { useCallback, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import './index.scss'
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
  { id: 11, name: '团队11' },
  { id: 12, name: '团队12' },
  { id: 13, name: '团队13' },
  { id: 14, name: '团队14' },
  { id: 15, name: '团队15' },
  { id: 16, name: '团队16' },
  { id: 17, name: '团队17' },
  { id: 18, name: '团队18' },
  { id: 19, name: '团队19' },
  { id: 20, name: '团队20' },
  { id: 21, name: '团队21' },
  { id: 22, name: '团队22' },
  { id: 23, name: '团队23' },
  { id: 24, name: '团队24' },
  { id: 25, name: '团队25' },
  { id: 26, name: '团队26' },
  { id: 27, name: '团队27' },
  { id: 28, name: '团队28' },
  { id: 29, name: '团队29' },
  { id: 30, name: '团队30' },
]

function TeamList(props: ListProps) {
  const { dataSource = demoList } = props
  const [activeTeamId, setActiveTeamId] = useState<number | null>()

  const handleToggleTeam = useCallback(
    (teamInfo: any) => {
      if (activeTeamId === teamInfo.id) return
      setActiveTeamId(teamInfo.id)
    },
    [activeTeamId],
  )

  const renderTeamItem = (item: any) => {
    return (
      <TeamItem
        className={`tw-team-list-item ${
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
          <button className="daisy-btn daisy-btn-ghost daisy-btn-xs">
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
    </>
  )
}

export default TeamList
