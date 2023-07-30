/*
 * @Author: kim
 * @Date: 2023-07-29 21:40:15
 * @Description: 头像
 */
import { useMemo, memo } from 'react'

export interface AvatarProps {
  className?: string
  url?: string
  name?: string
  online?: boolean
}

const Avatar = memo((props: AvatarProps) => {
  const { className, url, name, online } = props

  const classes = useMemo(() => {
    const classArr = ['daisy-avatar shrink-0']

    if (!url) {
      classArr.push('daisy-placeholder')
    }

    if (online) {
      classArr.push('daisy-online')
    }

    return classArr.join(' ')
  }, [url, online])

  return (
    <div className={classes}>
      <div
        className={`w-12 rounded-full bg-neutral-focus text-neutral-content transition-all ${className}`}
      >
        {url ? (
          <img src={url} alt={name} draggable={false} />
        ) : (
          <span className="text-xs">{name?.substring(0, 1)}</span>
        )}
      </div>
    </div>
  )
})

export default Avatar
