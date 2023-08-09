import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'
import { useRequest } from 'ahooks'
import { _get, _post } from '@/helpers/request'
import ProjectCard from '@/components/home/project-card/intex'
import FloatTips from '@/components/shared/float-tips'
import ProjectModal from '@/components/home/project-modal'
import Toast from '@/components/shared/toast'

const morkProjectData = [
  {
    id: 1,
    name: '价值几个亿的项目，讲真的，没骗你',
  },
  {
    id: 2,
    name: '价值几个亿的项目，讲真的，没骗你',
  },
  {
    id: 3,
    name: '价值几个亿的项目，讲真的，没骗你',
  },
  {
    id: 4,
    name: '价值几个亿的项目，讲真的，没骗你',
  },
]

function fetchCreateProject(projectName: string) {
  return _post('/project/create', {
    name: projectName,
  })
}

function fetchProjectList(query: { status?: number, team_id: string }) {
  return _get('/project/list', query)
}

function Home() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardAutoWidth, setCardAutoWidth] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const { data: projectList } = useRequest(fetchProjectList)

  const handleResize = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    // 16 是边距，256 是卡片最小宽度
    const numOfColumn = Math.floor((containerWidth - 16) / (256 + 16))
    setCardAutoWidth(morkProjectData.length >= numOfColumn)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 创建项目
  const handleCreateProject = async (projectName: string) => {
    try {
      console.log(projectName)
      const res = await fetchCreateProject(projectName)
      setShowProjectModal(false)
    } catch (error: any) {
      Toast.error(error.message)
    }
  }

  return (
    <div ref={containerRef}>
      <div className="flex w-full items-center p-4">
        <button
          className="daisy-btn daisy-btn-primary"
          onClick={() => setShowProjectModal(true)}
        >
          <PlusIcon className="h-6 w-6" />
          创建项目
        </button>
        <div className="daisy-divider daisy-divider-horizontal before:w-px after:w-px"></div>

        <div className="daisy-tabs">
          <a className="daisy-tab">进行中</a>
          <a className="daisy-tab daisy-tab-active">已归档</a>
        </div>

        <button className="daisy-btn daisy-btn-ghost ml-auto">
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
        </button>

        {/* <div className="ml-auto text-right">
          <div className="text-base text-base-content/60">项目数</div>
          <div className="text-2xl font-extrabold">123</div>
        </div> */}
      </div>

      <div
        className={`grid auto-cols-max grid-flow-row-dense gap-4 p-4 ${
          cardAutoWidth ? 'grid-cols-auto-fit-flex' : 'grid-cols-auto-fit-fixed'
        }`}
      >
        {morkProjectData.map((item) => (
          <ProjectCard
            className={cardAutoWidth ? '!w-full' : ''}
            key={item.id}
            dataSource={item}
          />
        ))}
      </div>

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
