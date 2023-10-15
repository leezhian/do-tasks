/*
 * @Author: kim
 * @Date: 2023-10-14 23:51:29
 * @Description: 通知页面
 */
import { useNavigate, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { BellIcon } from '@heroicons/react/24/outline'
import { _get } from '@/helpers/request'
import { TaskLogType } from '@/helpers/enum'
import NavBar from '@/components/shared/nav-bar'
import List from '@/components/shared/list'

export interface Notice {
  id: number
  status: number
  type: number
  editor: string
  create_time: string
  project: {
    project_id: string
    name: string
  }
  task: {
    task_id: string
    title: string
  }
}

const fetchNotices = (teamId: string) => {
  return _get<Notice[]>(`/notice/${teamId}`)
}

function Notice() {
  const navigate = useNavigate()
  const { teamId } = useParams()
  const { data: noticeList, loading } = useRequest(() => fetchNotices(teamId as string))

  const handleBack = () => {
    navigate(-1)
  }

  const computedNoticeText = (item: Notice) => {
    let text = ''
    switch(item.type) {
      case TaskLogType.Create:
        text = `${item.editor} 在 ${item.project.name} 项目创建了指派给您的任务《${item.task.title}》`
        break
      case TaskLogType.Update:
        text = `${item.editor} 在 ${item.project.name} 项目修改了关于您的任务《${item.task.title}》`
        break
      case TaskLogType.Delete:
        text =  `${item.editor} 在 ${item.project.name} 项目删除了《${item.task.title}》任务`
        break
    
    }

    return text
  }

  const renderNoticeItem = (item: Notice) => {
    return <div className="p-4" key={item.id}>
    <div className="flex">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-info">
        <BellIcon className="h-6 w-6 text-base-100" />
      </div>
      <div className="px-3 grow">
        <div className="flex justify-between items-center">
          <span className='font-bold text-accent-content'>消息提醒</span>
          <span className='text-xs text-base-content/50'>{item.create_time}</span>
        </div>
        <div className="text-xs truncate-2">
          {computedNoticeText(item)}
        </div>
      </div>
    </div>
  </div>
  }

  return (
    <div>
      <NavBar className=" sticky left-0 right-0 top-0" onBack={handleBack} />

      <List loading={loading} dataSource={noticeList} renderItem={renderNoticeItem} />
    </div>
  )
}

export default Notice
