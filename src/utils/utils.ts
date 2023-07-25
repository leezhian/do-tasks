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

/**
 * @description: 创建元素
 * @param {string} elementType 元素类型
 * @param {object} attributes 添加属性 对象
 * @return {HTMLElement}
 */
export function createHTMLElement(elementType: string, attributes?: { [key in string]: string }) {
  const el = document.createElement(elementType)
  if (attributes) {
    Object.keys(attributes).forEach(attrName => {
      el.setAttribute(attrName, attributes[attrName])
    })
  }

  return el
}