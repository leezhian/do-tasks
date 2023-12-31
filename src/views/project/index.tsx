import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { useRequest } from 'ahooks'
import { _delete, _get, _patch, _post } from '@/helpers/request'
import { ProjectStatus } from '@/helpers/enum'
import ProjectList from '@/components/project/project-list'
import FloatTips from '@/components/shared/float-tips'
import ProjectModal from '@/components/project/project-modal'
import TeamModal, { TeamModalRef } from '@/components/project/team-modal'
import Modal from '@/components/shared/modal'
import Toast from '@/components/shared/toast'
import {
  fetchProjectList,
  fetchCreateProject,
  deleteProject,
  updateProjectStatus,
  ProjectItem,
  fetchTeam,
  updateTeam,
} from './service'

const statusTab = [
  {
    label: '进行中',
    value: ProjectStatus.Active,
  },
  {
    label: '已归档',
    value: ProjectStatus.Archive,
  },
]

function Project() {
  const navigate = useNavigate()
  const { teamId } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const teamModalRef = useRef<TeamModalRef>(null)
  const [cardAutoWidth, setCardAutoWidth] = useState(false) // 卡片是否自适应宽度
  const [activeTab, setActiveTab] = useState(ProjectStatus.Active)
  const [projectList, setProjectList] = useState<ProjectItem[]>([])
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const {} = useRequest(
    () =>
      fetchProjectList({
        status: activeTab,
        team_id: teamId ?? '',
      }),
    {
      onSuccess: (res) => {
        setProjectList(res)
      },
      onError: (error) => {
        console.log('error', error)
        throw error
      },
      refreshDeps: [activeTab, teamId],
    },
  )

  const handleResize = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    // 16 是边距，256 是卡片最小宽度
    const numOfColumn = Math.floor((containerWidth - 16) / (256 + 16))
    setCardAutoWidth(projectList.length >= numOfColumn)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 切换 tab
  const handleTabChange = (tabValue: number) => {
    if (activeTab === tabValue) return
    setActiveTab(tabValue)
  }

  // 创建项目
  const handleCreateProject = async (projectName: string) => {
    try {
      const res = await fetchCreateProject(projectName, teamId ?? '')
      if (activeTab === 1) {
        setProjectList([res, ...projectList])
      }

      setShowProjectModal(false)
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  const navigateToNotice = () => {
    navigate(`notice`, {
      relative: 'path',
    })
  }

  const handleShowTeamModal = async () => {
    const res = await fetchTeam(teamId ?? '')
    teamModalRef.current?.setFieldsValue({
      teamName: res.name,
      members: res.members,
    })

    setShowTeamModal(true)
  }

  // 更新团队
  const handleUpdateTeam = async (teamName: string, teamMembers: string[]) => {
    try {
      await updateTeam(teamId ?? '', {
        name: teamName,
        members: teamMembers.join(','),
      })
      Toast.success('更新团队成功！')
      setShowTeamModal(false)
    } catch (error) {
      Toast.error('更新团队失败！')
    }
  }

  // 移除本地项目列表
  const removeProjectFromLocal = (projectId: string) => {
    const newProjectList = [...projectList]
    const targetIndex = newProjectList.findIndex(
      (i) => i.project_id === projectId,
    )
    if (targetIndex >= 0) {
      newProjectList.splice(targetIndex, 1)
      setProjectList(newProjectList)
    }
  }

  // 项目下拉列表操作
  const projectDropdownActions: Record<string, (item: ProjectItem) => void> = {
    delete: (item) => {
      Modal.confirm({
        title: '确定要删除该项目吗？',
        content: '删除后无法恢复！',
        onOk: async () => {
          try {
            await deleteProject(item.project_id)
            removeProjectFromLocal(item.project_id)
            Toast.success('删除成功')
          } catch (error: any) {
            Toast.error('删除失败')
          }
        },
      })
    },
    archive: (item) => {
      Modal.confirm({
        title: '确定要归档该项目吗？',
        content: '归档后项目将无法更改，但可在归档列表中恢复！',
        onOk: async () => {
          try {
            await updateProjectStatus(item.project_id, ProjectStatus.Archive)
            removeProjectFromLocal(item.project_id)
            Toast.success('归档成功')
          } catch (error: any) {
            Toast.error('归档失败')
          }
        },
      })
    },
    unarchive: async (item) => {
      try {
        await updateProjectStatus(item.project_id, ProjectStatus.Active)
        removeProjectFromLocal(item.project_id)
        Toast.success('取消归档成功')
      } catch (error) {
        Toast.error('取消归档失败')
      }
    },
  }

  // 项目下拉列表处理
  const handleProjectDropdownItem = (name: string, item: ProjectItem) => {
    projectDropdownActions[name] && projectDropdownActions[name](item)
  }

  // 跳转到项目详情
  const navToProjectDetail = (projectId: string) => {
    navigate(`${projectId}`, {
      relative: 'path',
    })
  }

  // 渲染项目列表
  const renderProjectItem = (info: ProjectItem) => {
    return (
      <ProjectList.Item
        className={cardAutoWidth ? '!w-full' : ''}
        key={info.project_id}
        dataSource={info}
        onClick={() => navToProjectDetail(info.project_id)}
        onDropdownClick={handleProjectDropdownItem}
      />
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <div className="sticky top-0 z-10 flex w-full items-center bg-base-100 p-4">
        <button
          className="daisy-btn daisy-btn-primary"
          onClick={() => setShowProjectModal(true)}
        >
          <PlusIcon className="h-6 w-6" />
          创建项目
        </button>
        <div className="daisy-divider daisy-divider-horizontal before:w-px after:w-px"></div>

        <div className="daisy-tabs">
          {statusTab.map((item) => (
            <a
              key={item.value}
              className={`daisy-tab ${
                activeTab === item.value ? 'daisy-tab-active' : ''
              }`}
              onClick={() => handleTabChange(item.value)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="ml-auto inline-flex items-center">
          {/* 通知 */}
          <div
            className="daisy-indicator sm:daisy-tooltip sm:daisy-tooltip-bottom "
            data-tip="通知"
            onClick={navigateToNotice}
          >
            {/* <span className="daisy-badge daisy-indicator-item daisy-badge-secondary right-3 top-1 h-2 w-2 p-0"></span> */}
            <button className="daisy-btn daisy-btn-ghost daisy-btn-sm border-0">
              <BellIcon className="h-6 w-6" />
            </button>
          </div>

          <button
            className="daisy-btn daisy-btn-ghost daisy-btn-sm"
            onClick={handleShowTeamModal}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <ProjectList
        itemAutoWidth={cardAutoWidth}
        dataSource={projectList}
        renderItem={renderProjectItem}
      />

      {/* 悬浮统计 */}
      <FloatTips items={[{ label: '项目数', value: projectList.length }]} />

      <ProjectModal
        title="创建新项目"
        clearOnClose
        open={showProjectModal}
        onCancel={() => setShowProjectModal(false)}
        onOk={handleCreateProject}
      />

      <TeamModal
        ref={teamModalRef}
        title="修改团队"
        open={showTeamModal}
        onOk={handleUpdateTeam}
        onCancel={() => setShowTeamModal(false)}
        clearOnClose
      />
    </div>
  )
}

export default Project
