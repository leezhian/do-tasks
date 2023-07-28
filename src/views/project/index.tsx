/*
 * @Author: kim
 * @Date: 2023-07-26 18:49:09
 * @Description: 项目页
 */
import { ChartBarIcon, ListBulletIcon } from '@heroicons/react/24/solid'
import NavBar from '@/components/shared/nav-bar'
import TaskTable from '@/components/project/task-table'
import FilterSelect from '@/components/project/filter-select'
import SortSelect from '@/components/project/sort-select'

function Project() {
  return (
    <div className="w-full">
      <NavBar
        className=" sticky left-0 right-0 top-0"
        right={
          <button className="daisy-btn daisy-btn-primary daisy-btn-sm">
            新增任务
          </button>
        }
      />
      <section className="p-4">
        <h3 className=" text-xl font-semibold mb-4">
          价值几个亿的项目，讲真的，没骗你
        </h3>

        <div className="mb-4 flex items-center justify-between">
          <div className="space-x-2">
            <FilterSelect />
            <SortSelect />
          </div>

          <div className="daisy-tabs-boxed daisy-tabs bg-transparent">
            <a className="daisy-tab px-3">
              <ListBulletIcon className="mr-1 h-4 w-4" />
              表格
            </a>
            <a className="daisy-tab daisy-tab-active px-3">
              <ChartBarIcon className="mr-1 h-4 w-4" />
              度量
            </a>
          </div>
        </div>

        <TaskTable />
      </section>
    </div>
  )
}

export default Project
