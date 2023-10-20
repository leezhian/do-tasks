/*
 * @Author: kim
 * @Date: 2023-08-21 20:05:31
 * @Description: 
 */
import { useMemo } from 'react'
import Avatar, { AvatarProps } from './index'

export interface AvatarGroupProps {
  className?: string
  list?: Array<AvatarProps>
  limit?: number // 最多显示多少个
  rowKey: (item: AvatarProps) => string // 用于 react key
}

function AvatarGroup(props: AvatarGroupProps) {
  const { className, list = [], limit = 3, rowKey } = props

  const avatarList = useMemo(() => {
    if(list.length <= limit) return list

    return list.slice(0, limit).concat({
      ...list[0],
      uid: 'more',
      url: '',
      name: `+${list.length - limit}`,
      defaultAvatarFirstChar: false
    })
  }, [list])

  return <div className={`daisy-avatar-group -space-x-6 ${className ?? ''}`}>
    {
      avatarList.map((item, index) => <Avatar key={rowKey(item) ?? `avatar-${index}`} {...item} />)
    }
  </div>
}

export default AvatarGroup