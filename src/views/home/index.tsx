import { useEffect, useRef, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import ProjectCard from '@/components/home/project-card/intex'

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

  return (
    <div className="min-h-screen grow" ref={containerRef}>
      <div className="flex w-full items-center p-4">
        <button className="btn btn-primary">
          <PlusIcon className="h-6 w-6" />
          创建项目
        </button>
        <div className="divider divider-horizontal before:w-px after:w-px"></div>

        <div className="tabs">
          <a className="tab">进行中</a>
          <a className="tab tab-active">已归档</a>
        </div>

        <div className="ml-auto text-right">
          <div className="text-base text-base-content/60">项目数</div>
          <div className="text-2xl font-extrabold">123</div>
        </div>
      </div>

      <div className={`p-4 grid gap-4 grid-flow-row-dense auto-cols-max ${cardAutoWidth ? 'grid-cols-auto-fit-flex' : 'grid-cols-auto-fit-fixed'}`}>
        {morkProjectData.map(item => <ProjectCard className={cardAutoWidth ? '!w-full' : ''} key={item.id} dataSource={item} />)}
      </div>
    </div>
  )
}

export default Home
