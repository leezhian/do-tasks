/*
 * @Author: kim
 * @Date: 2023-07-24 18:58:34
 * @Description: 工具类
 */
export const setBodyOverflow = (function() {
  let count = 0

  return (overflow: boolean) => {
    count = overflow ? count + 1 : Math.max(Math.abs(count - 1), 0)

    if(count <= 0) {
      document.body.classList.remove('overflow-hidden')
    } else if(overflow && count === 1) {
      document.body.classList.add('overflow-hidden')
    }
  }
})()