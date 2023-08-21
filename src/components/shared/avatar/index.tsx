/*
 * @Author: kim
 * @Date: 2023-07-29 21:40:15
 * @Description: 头像
 */
import { useMemo } from 'react'
import AvatarGroup from './group'

export interface AvatarProps {
  wrapperClassName?: string
  className?: string
  url?: string
  name?: string
  online?: boolean
  defaultAvatarFirstChar?: boolean // 默认头像是否只显示第一个字符
  [key: string]: any
}

function Avatar(props: AvatarProps) {
  const { className, url, name, online, wrapperClassName, defaultAvatarFirstChar = true } = props

  const classes = useMemo(() => {
    const classArr = ['daisy-avatar shrink-0']

    if (!url) {
      classArr.push('daisy-placeholder')
    }

    if (online) {
      classArr.push('daisy-online')
    }

    if (wrapperClassName) {
      classArr.push(wrapperClassName)
    }

    return classArr.join(' ')
  }, [url, online, wrapperClassName])

  return (
    <div className={classes}>
      <div
        className={`w-12 rounded-full bg-neutral-focus text-neutral-content transition-all ${className}`}
      >
        {url ? (
          <img src={url} alt={name} draggable={false} />
        ) : (
          <span className="text-xs">{defaultAvatarFirstChar ? name?.substring(0, 1) : name}</span>
        )}
      </div>
    </div>
  )
}

Avatar.Group = AvatarGroup
export default Avatar
