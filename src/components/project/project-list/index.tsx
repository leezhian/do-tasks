/*
 * @Author: kim
 * @Date: 2023-08-09 23:56:09
 * @Description:
 */
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import Empty from '@/components/shared/empty'
import ContentEmpty from '@/assets/images/content-empty.svg'
import Item from './item'

export interface ProjectListProps {
  dataSource?: any[]
  itemAutoWidth?: boolean
  renderItem?: (item: any) => ReactNode
}

function ProjectList(props: ProjectListProps) {
  const { dataSource = [], itemAutoWidth = false, renderItem } = props

  const content = useMemo(() => {
    if (dataSource.length) {
      return dataSource.map((item) => {
        return renderItem ? renderItem(item) : null
      })
    }
  }, [dataSource, renderItem])

  return (
    <>
      {!!dataSource.length && (
        <div
          className={`grid auto-cols-max grid-flow-row-dense gap-4 p-4 ${
            itemAutoWidth
              ? 'grid-cols-auto-fit-flex'
              : 'grid-cols-auto-fit-fixed'
          }`}
        >
          {content}
        </div>
      )}
      {!dataSource.length && <div className='pt-16'><Empty image={ContentEmpty} description="暂无更多项目" /></div>}
    </>
  )
}

ProjectList.Item = Item

export default ProjectList
