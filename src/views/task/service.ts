import { _get, _patch, _post } from '@/helpers/request'
import type { FileInfo } from '@/typings/base'

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

export interface ProjectDetail {
  project_id: string
  name: string
  status: number
  team: {
    team_id: string
    name: string
    members: string
    status: number
    creator_id: string
  }
  task_summary: {
    total: number
    done_task_count: number
  }
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

/**
 * @description: 上传文件
 * @param {FormData} formData
 * @return {*}
 */
export function uploadFile(formData: FormData) {
  return _post<FileInfo>('/common/upload', formData)
}

/**
 * @description: 修改项目
 * @param {string} projectId
 * @param {object} payload
 * @return {project}
 */
export function updateProject(projectId: string, payload?: { name?: string }) {
  return _patch(`/project/${projectId}`, payload)
}

/**
 * @description: 创建任务
 * @param {string} projectId
 * @param {TaskCreatePayload} payload
 * @return {promise}
 */
export function createTask(projectId: string, payload: TaskCreatePayload) {
  return _post('/task/create', {
    ...payload,
    project_id: projectId
  })
}

/**
 * @description: 获取项目详情
 * @param {string} projectId
 * @return {promise<ProjectDetail>}
 */
export function getProjectDetail(projectId: string) {
  return _get<ProjectDetail>(`/project/${projectId}`)
}

interface GetTaskListParams {
  order_by?: string
  order_method?: string
  status?: number
  object?: number
}

/**
 * @description: 获取任务列表
 * @param {string} projectId
 * @param {object} payload
 * @return {promise<Task[]>}
 */
export function getTaskList(projectId: string, payload?: GetTaskListParams) {
  if (!projectId) return Promise.resolve([])
  return _get<Task[]>('/task/list', { project_id: projectId, ...payload })
}