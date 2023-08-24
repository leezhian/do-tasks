/*
 * @Author: kim
 * @Date: 2023-08-24 17:40:04
 * @Description: 项目选择空状态
 */
import Empty from '@/components/shared/empty'
import TeamEmpty from '@/assets/images/team-empty.png'

const EmptyTeam = () => {
  return (
    <div className="h-full pt-[20%]">
      <Empty
        image={TeamEmpty}
        imageStyle={{ height: '50vw', maxHeight: '210px' }}
        description="请先创建或选择一个团队"
      />
    </div>
  )
}

export default EmptyTeam
