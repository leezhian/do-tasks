/*
 * @Author: kim
 * @Date: 2023-08-10 17:13:56
 * @Description: 
 */
// 项目状态
export enum ProjectStatus {
  Ban,
  Active,
  Archive
}

// 任务优先级
export enum TaskPriority {
  P0,
  P1,
  P2,
  P3,
  P4
}

// 任务状态
export enum TaskStatus {
  Ban,
  Todo,
  UnderReview,
  ReviewFailed,
  Done,
}

export enum SearchType {
  Project = '1',
  Task = '2',
}

// 任务日志类型
export enum TaskLogType {
  Delete,
  Create,
  Update
}