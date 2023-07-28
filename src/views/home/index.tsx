import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import ProjectCard from '@/components/home/project-card/intex'
import Modal from '@/components/shared/modal'

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

function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardAutoWidth, setCardAutoWidth] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleResize = () => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    // 16 是边距，256 是卡片最小宽度
    const numOfColumn = Math.floor((containerWidth - 16) / (256 + 16))
    setCardAutoWidth(morkProjectData.length >= numOfColumn)
  }

  const handleModalClose = () => {
    // setShowModal(false)
    navigate('/project/1')
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div className="flex w-full items-center p-4">
        <button
          className="daisy-btn daisy-btn-primary"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon className="h-6 w-6" />
          创建项目
        </button>
        <div className="daisy-divider daisy-divider-horizontal before:w-px after:w-px"></div>

        <div className="daisy-tabs">
          <a className="daisy-tab">进行中</a>
          <a className="daisy-tab daisy-tab-active">已归档</a>
        </div>

        <div className="ml-auto text-right">
          <div className="text-base text-base-content/60">项目数</div>
          <div className="text-2xl font-extrabold">123</div>
        </div>
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
            onClick={handleModalClose}
          />
        ))}
      </div>

      <Modal
        wrapClassName="!w-96"
        title="创建新项目"
        open={false}
        destroyOnClose
      >
        <form>
          <input
            type="text"
            placeholder="输入项目名称"
            maxLength={30}
            className="daisy-input daisy-input-bordered daisy-input-md w-full"
          />
        </form>
      </Modal>
    </div>
  )
}

export default Home
