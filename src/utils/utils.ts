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

/**
 * @description: 浏览器信息
 * @return {object}
 */
export const browser = {
  versions: (function () {
    const u = navigator.userAgent
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1, //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      mac: !!u.toLowerCase().match(/macintosh|mac os x/),
    }
  })(),
}