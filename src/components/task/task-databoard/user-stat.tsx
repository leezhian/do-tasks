/*
 * @Author: kim
 * @Date: 2023-08-30 02:04:52
 * @Description: 用户任务汇总
 */
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { _get } from '@/helpers/request'

interface UserTaskStatResponse {
  done_count: number
  need_done_count: number
  reviewed_count: number
  need_review_count: number
}

function fetchUserTaskStat(projectId: string) {
  return _get<UserTaskStatResponse>(
    `/project/${projectId}/user-task-stat`,
  )
}

function UserStat() {
  const { projectId } = useParams()
  const { data } = useRequest(() => fetchUserTaskStat(projectId as string), {
    refreshDeps: [projectId]
  })

  return (
    <div className='flex'>
      <div className="daisy-stat">
        <div className="daisy-stat-value">{data?.need_done_count}个</div>
        <div className="daisy-stat-title">总负责任务数量</div>
        <div className="daisy-stat-desc text-secondary">已处理 {data?.done_count}个</div>
      </div>
      <div className="daisy-stat">
        <div className="daisy-stat-value">{data?.need_review_count}个</div>
        <div className="daisy-stat-title">总审核任务数量</div>
        <div className="daisy-stat-desc text-secondary">已审核 {data?.reviewed_count}个</div>
      </div>
    </div>
  )
}

export default UserStat
