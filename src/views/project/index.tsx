import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'
import { useRequest } from 'ahooks'
import { _get, _post } from '@/helpers/request'
import ProjectList from '@/components/project/project-list'
import FloatTips from '@/components/shared/float-tips'
import ProjectModal from '@/components/project/project-modal'
import Toast from '@/components/shared/toast'

interface ProjectItem {
  name: string
  project_id: string
  status: number
}

// 创建项目
function fetchCreateProject(projectName: string, teamId: string) {
  return _post<ProjectItem>('/project/create', {
    name: projectName,
    team_id: teamId,
  })
}

// 获取项目列表
function fetchProjectList(query: { status?: number; team_id: string }) {
  return _get<ProjectItem[]>('/project/list', query)
}

const statusTab = [
  {
    label: '进行中',
    value: 1,
  },
  {
    label: '已归档',
    value: 2,
  },
]

function Home() {
  const navigate = useNavigate()
  const { teamId } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardAutoWidth, setCardAutoWidth] = useState(false) // 卡片是否自适应宽度
  const [activeTab, setActiveTab] = useState(1)
  const [projectList, setProjectList] = useState<ProjectItem[]>([])
  const [showProjectModal, setShowProjectModal] = useState(false)
  const { loading } = useRequest(
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

  // 跳转到项目详情
  const navToProjectDetail = (projectId: string) => {
    navigate(`${projectId}`, {
      relative: 'path'
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
      />
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <div className="sticky top-12 z-10 flex w-full items-center bg-base-100 p-4 md:top-0">
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

        <button className="daisy-btn daisy-btn-ghost ml-auto">
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
        </button>
      </div>

      <ProjectList itemAutoWidth={cardAutoWidth} dataSource={projectList} renderItem={renderProjectItem} />

      {/* 悬浮统计 */}
      <FloatTips items={[{ label: '项目数', value: 123 }]} />

      <ProjectModal
        title="创建新项目"
        open={showProjectModal}
        onCancel={() => setShowProjectModal(false)}
        onOk={handleCreateProject}
      />
    </div>
  )
}

export default Home
