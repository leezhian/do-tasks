/*
 * @Author: kim
 * @Date: 2023-07-31 17:52:06
 * @Description: 更多选项下拉列表
 */
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

function MoreSettingDropdown() {
  return (
    <div className="daisy-dropdown">
      <label
        tabIndex={0}
        className="daisy-btn daisy-btn-ghost daisy-btn-sm cursor-pointer"
      >
        <EllipsisVerticalIcon className="h-4 w-4" />
      </label>
      <ul
        tabIndex={0}
        className="daisy-menu daisy-dropdown-content rounded-lg z-[1] w-20 bg-base-100 px-0 text-xs shadow"
      >
        <li>
          <a className="rounded-none px-2 py-1">修改名称</a>
        </li>
        <li>
          <a className="rounded-none px-2 py-1">归档</a>
        </li>
      </ul>
    </div>
  )
}

export default MoreSettingDropdown
