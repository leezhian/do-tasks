/*
 * @Author: kim
 * @Date: 2023-08-29 14:30:31
 * @Description: 任务数据看板
 */
import { _get } from '@/helpers/request'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import GroupedColumn from '@/components/shared/chart/grouped-column'
import UserStat from './user-stat'

function fetchTaskStautsSummary(projectId: string, object?: number) {
  return _get<Record<string, any>[]>(
    `/project/${projectId}/task-status-summary`,
    {
      object,
    },
  )
}

function taskSummaryTypeFormatter(value: string) {
  switch (value) {
    case 'done_task':
      return '完成数'
    case 'approved_task':
      return '审核数'
    default:
      return value
  }
}

export interface TaskDataBoardProps {
  object?: number
}

function TaskDataBoard({ object }: TaskDataBoardProps) {
  const { projectId } = useParams()
  const { data } = useRequest(
    () => fetchTaskStautsSummary(projectId as string, object),
    {
      refreshDeps: [projectId, object],
    },
  )

  return (
    <div>
      { object === 1 && <UserStat /> }

      <GroupedColumn
        title="个人七天任务完成数和审核数汇总"
        data={data ?? []}
        xField="day"
        yField="count"
        seriesField="type"
        meta={{
          type: {
            formatter: taskSummaryTypeFormatter,
          },
        }}
        isGroup
        autoFit
      />
    </div>
  )
}

export default TaskDataBoard
