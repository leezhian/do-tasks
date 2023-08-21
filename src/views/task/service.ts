import { _get, _post } from '@/helpers/request'
import type {FileInfo} from '@/typings/base'

export interface TaskCreatePayload {
  title: string
  owner_ids: string
  reviewer_id: string
  priority: number
  process_type_id: number
  start_time: number
  end_time: number
  content?: string
}

export interface Task {
  createdAt: string
  end_time: number
  priority: number
  start_time: number
  status: number
  task_id: string
  title: string
  owners: {
    avatar: string
    name: string
    uid: string
  }
  process_type: {
    id: number
    name: string
  }
  reviewer: {
    avatar: string
    name: string
    uid: string
  }
}

export function uploadFile(formData: FormData) {
  return _post<FileInfo>('/common/upload', formData)
}

export function createTask(projectId: string, payload: TaskCreatePayload) {
  return _post('/task/create', {
    ...payload,
    project_id: projectId
  })
}

export function getTaskList(projectId: string, payload?: { order_by?: string, order_method?: string } ) {
  if(!projectId) return Promise.resolve([])
  return _get<Task[]>('/task/list', { project_id: projectId, ...payload })
}