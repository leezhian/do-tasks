/*
 * @Author: kim
 * @Date: 2023-07-24 18:58:34
 * @Description: 工具类
 */
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