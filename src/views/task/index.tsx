/*
 * @Author: kim
 * @Date: 2023-07-26 18:49:09
 * @Description: 项目页
 */
import { useState, useMemo, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChartBarIcon, ListBulletIcon } from '@heroicons/react/24/solid'
import { useRequest } from 'ahooks'
import { _post, _get } from '@/helpers/request'
import { upload } from '@/helpers/upload-file'
import { usePercent } from '@/hooks'
import { ProjectStatus } from '@/helpers/enum'
import NavBar from '@/components/shared/nav-bar'
import TaskTable from '@/components/task/task-table'
import TaskDataBoard from '@/components/task/task-databoard'
import ObjectSelect from '@/components/task/object-select'
import FilterSelect from '@/components/task/filter-select'
import SortSelect from '@/components/task/sort-select'
import FloatTips from '@/components/shared/float-tips'
import NavRightBtnGroup from '@/components/task/nav-right-btn-group'
import Modal from '@/components/shared/modal'
import TaskSettingModal from '@/components/task/task-setting-modal'
import ProjectModal, {
  ProjectModalRef,
} from '@/components/project/project-modal'
import Toast from '@/components/shared/toast'
import { updateProjectStatus } from '@/views/project/service'
import {
  createTask,
  getProjectDetail,
  updateProject,
  TaskCreatePayload,
  ProjectDetail,
} from './service'

function Tasks() {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const [activeTab, setActiveTab] = useState<string>('table')
  const projectModalRef = useRef<ProjectModalRef>(null)
  const [orderBy, setOrderBy] = useState<string>() // 排序字段
  const [orderMethod, setSortMethod] = useState<string>() // 排序方式
  const [filterStatus, setFilterStatus] = useState<number>() // 筛选状态
  const [filterObject, setFilterObject] = useState<number>(1) // 筛选对象
  const [showTaskSettingModal, setShowTaskSettingModal] = useState(false)
  const [showProjectSettingModal, setShowProjectSettingModal] = useState(false)
  const [projectDetail, setProjectDetail] = useState<ProjectDetail>()
  useRequest(() => getProjectDetail(projectId as string), {
    onSuccess: (res) => {
      setProjectDetail(res)
    },
    refreshDeps: [projectId],
  })
  // 任务完成率
  const ppc = usePercent(
    projectDetail?.task_summary.done_task_count ?? 0,
    projectDetail?.task_summary.total ?? 0,
  )

  // 返回上一页
  const handleBack = () => {
    navigate(-1)
  }

  // 显示任务配置弹窗
  const handleShowTaskSettingModal = () => {
    if (projectDetail?.status !== ProjectStatus.Active) {
      Toast.warning('该项目已归档，无法添加任务')
      return
    }
    setShowTaskSettingModal(true)
  }

  // 右侧按钮组逻辑处理
  const rightBtnGroupActions = useMemo<
    Record<string, (projectId: string) => void>
  >(() => {
    return {
      update: () => {
        projectModalRef.current?.setFieldsValue({
          projectName: projectDetail?.name,
        })
        setShowProjectSettingModal(true)
      },
      archive: async (projectId: string) => {
        Modal.confirm({
          title: '确定要归档该项目吗？',
          content: '归档后项目将无法更改，但可在归档列表中恢复！',
          onOk: async () => {
            try {
              await updateProjectStatus(projectId, ProjectStatus.Archive)
              setProjectDetail(
                (pd) =>
                  ({
                    ...pd,
                    status: ProjectStatus.Archive,
                  }) as ProjectDetail,
              )
              Toast.success('归档成功')
            } catch (error: any) {
              Toast.error('归档失败')
            }
          },
        })
      },
      unarchive: async (projectId: string) => {
        try {
          await updateProjectStatus(projectId, ProjectStatus.Active)
          setProjectDetail(
            (pd) =>
              ({
                ...pd,
                status: ProjectStatus.Active,
              }) as ProjectDetail,
          )
          Toast.success('取消归档成功')
        } catch (error) {
          Toast.error('取消归档失败')
        }
      },
    }
  }, [projectDetail?.name])

  // 修改项目
  const handleUpdateProject = async (projectName: string) => {
    try {
      await updateProject(projectId as string, {
        name: projectName,
      })
      setProjectDetail((pd) => ({ ...pd, name: projectName }) as ProjectDetail)
      setShowProjectSettingModal(false)
      Toast.success('修改成功')
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  // 项目设置
  const handleSettingProject = useCallback(
    (type: string) => {
      rightBtnGroupActions[type] &&
        rightBtnGroupActions[type](projectId as string)
    },
    [rightBtnGroupActions],
  )

  // 新增任务
  const handleCreateTask = async (formData: any) => {
    try {
      const payload: TaskCreatePayload = {
        title: formData.title,
        owner_ids: formData.owner.join(','),
        reviewer_id: formData.reviewer,
        priority: formData.priority,
        process_type_id: formData.process_type,
        start_time: formData.datetime[0].startOf('day').unix(),
        end_time: formData.datetime[1].startOf('day').unix(),
      }

      // 内容上传
      const { content } = formData
      if (content && content.trim() !== '') {
        const res = await upload('text/html', `${Date.now()}.html`, content)
        payload.content = res.url
      }

      await createTask(projectId ?? '', payload)
      setShowTaskSettingModal(false)
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  return (
    <div className="w-full">
      <NavBar
        className=" sticky left-0 right-0 top-0"
        right={
          <NavRightBtnGroup
            dataSource={projectDetail}
            onCreateTask={handleShowTaskSettingModal}
            onSettingProject={handleSettingProject}
          />
        }
        onBack={handleBack}
      />
      <section className="p-4">
        <h3 className="mb-4 flex-grow truncate text-xl font-semibold sm:max-w-md">
          {projectDetail?.name}
        </h3>

        <div className="mb-4 sm:flex sm:flex-row-reverse sm:items-center sm:justify-between">
          <div className="daisy-tabs-boxed daisy-tabs mb-3 sm:mb-0 sm:bg-transparent">
            <a
              className={`daisy-tab px-3 ${activeTab === 'table' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveTab('table')}
            >
              <ListBulletIcon className="mr-1 h-4 w-4" />
              表格
            </a>
            <a
              className={`daisy-tab px-3 ${activeTab === 'databoard' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveTab('databoard')}
            >
              <ChartBarIcon className="mr-1 h-4 w-4" />
              度量
            </a>
          </div>

          <div className="space-x-2">
            <ObjectSelect
              value={filterObject}
              onSelect={(value) => setFilterObject(value as number)}
            />
            <FilterSelect
              value={filterStatus}
              onSelect={(value) => setFilterStatus(value as number)}
            />
            <SortSelect
              value={orderBy}
              onSelect={(value) => setOrderBy(value as string)}
              onSortMethodChange={(value) => setSortMethod(value)}
            />
          </div>
        </div>

        {activeTab === 'table' ? (
          <TaskTable
            orderBy={orderBy}
            orderMethod={orderMethod}
            filterStatus={filterStatus}
            filterObject={filterObject}
          />
        ) : (
          <TaskDataBoard object={filterObject} />
        )}
      </section>

      {/* remark 并不会跟随筛选改变 */}
      <FloatTips
        items={[
          { label: '总任务数', value: projectDetail?.task_summary.total },
          { label: '完成进度', value: `${ppc}%` },
        ]}
      />

      {/* 任务配置弹窗 */}
      <TaskSettingModal
        open={showTaskSettingModal}
        title="新增任务"
        onOk={handleCreateTask}
        onCancel={() => setShowTaskSettingModal(false)}
      />

      {/* 项目修改弹窗 */}
      <ProjectModal
        ref={projectModalRef}
        title="修改项目"
        clearOnClose
        open={showProjectSettingModal}
        onCancel={() => setShowProjectSettingModal(false)}
        onOk={handleUpdateProject}
      />
    </div>
  )
}

export default Tasks
