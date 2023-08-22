import { _get, _post, _patch, _delete } from '@/helpers/request'

export interface ProjectItem {
  name: string
  project_id: string
  status: number
}

// 获取项目列表
export function fetchProjectList(query: { status?: number; team_id: string }) {
  return _get<ProjectItem[]>('/project/list', query)
}

/**
 * @description: 创建项目
 * @param {string} projectName 项目名称
 * @param {string} teamId 团队id
 * @return {*}
 */
export function fetchCreateProject(projectName: string, teamId: string) {
  return _post<ProjectItem>('/project/create', {
    name: projectName,
    team_id: teamId,
  })
}

/**
 * @description: 修改项目状态
 * @param {string} projectId 项目id
 * @param {number} status 项目状态
 * @return {promise}
 */
export function updateProjectStatus(projectId: string, status: number) {
  return _patch(`/project/${projectId}/status`, {
    status,
  })
}

/**
 * @description: 删除项目
 * @param {string} projectId 项目id
 * @return {promise}
 */
export function deleteProject(projectId: string) {
  return _delete(`/project/${projectId}`)
}