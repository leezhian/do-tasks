/*
 * @Author: kim
 * @Date: 2023-07-26 18:49:09
 * @Description: 项目页
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChartBarIcon, ListBulletIcon } from '@heroicons/react/24/solid'
import NavBar from '@/components/shared/nav-bar'
import TaskTable from '@/components/task/task-table'
import FilterSelect from '@/components/task/filter-select'
import SortSelect from '@/components/task/sort-select'
import TaskSettingModal from '@/components/task/task-setting-modal'
import FloatTips from '@/components/shared/float-tips'
import MoreSettingDropdown from '@/components/task/more-setting-dropdown'

function Project() {
  const navigate = useNavigate()
  const [showTaskSettingModal, setShowTaskSettingModal] = useState(false)

  const handleBack = () => {
    navigate(-1)
  }

  const handleShowTaskSettingModal = () => {
    setShowTaskSettingModal(true)
  }

  return (
    <div className="w-full">
      <NavBar
        className=" sticky left-0 right-0 top-0"
        right={
          <button
            className="daisy-btn daisy-btn-primary daisy-btn-sm"
            onClick={handleShowTaskSettingModal}
          >
            新增任务
          </button>
        }
        onBack={handleBack}
      />
      <section className="p-4">
        <h3 className="mb-4 flex-grow text-xl font-semibold truncate sm:max-w-md">
          价值几个亿的项目，讲真的，没骗你
        </h3>

        <div className="mb-4 sm:flex sm:flex-row-reverse sm:items-center sm:justify-between">
          <div className="daisy-tabs-boxed daisy-tabs mb-3 sm:mb-0 sm:bg-transparent">
            <a className="daisy-tab px-3">
              <ListBulletIcon className="mr-1 h-4 w-4" />
              表格
            </a>
            <a className="daisy-tab daisy-tab-active px-3">
              <ChartBarIcon className="mr-1 h-4 w-4" />
              度量
            </a>
          </div>

          <div className="space-x-2">
            <FilterSelect />
            <SortSelect />
            <MoreSettingDropdown />
          </div>
        </div>

        <TaskTable />
      </section>

      <FloatTips
        items={[
          { label: '总任务数', value: '123' },
          { label: '完成进度', value: '16%' },
        ]}
      />
      <TaskSettingModal
        open={showTaskSettingModal}
        title="新增任务"
        onCancel={() => setShowTaskSettingModal(false)}
      />
    </div>
  )
}

export default Project
