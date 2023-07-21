/*
 * @Author: kim
 * @Date: 2023-07-21 17:40:10
 * @Description: localstroage & sessionstroage 封装
 */

export interface StorageValue {
  data: any,
  expire: number | null 
}

export interface StorageClass {
  setItem(key: string, value: any, expire?: number | null): void
  getOriginItem(key: string): StorageValue | null
  getItem(key: string): any
  removeItem(key: string): void
  removeExpireItem(key: string, isExact?: boolean): void
  clear(): void
  isExistItem(key: string): boolean
  isExpire(key: string): boolean
}

class Storage implements StorageClass {
  private storage
  constructor(storage: globalThis.Storage) {
    this.storage = storage
  }

  /**
   * @description: 存储数据
   * @param {String} key 键
   * @param {any} value 值
   * @param {Number|null} expire 有效期,不传表示长期有效
   * @return {void}
   */
  setItem(key: string, value: any, expire = null) {
    const val = {
      data: value,
      expire
    }
    this.storage.setItem(key, JSON.stringify(val))
  }

  /**
   * @description: 获取对应的数据(即原生 getItem 返回的数据)
   * @param {String} key
   * @return {StorageValue | null}
   */
  getOriginItem(key: string): StorageValue | null {
    const strogeValueStr = this.storage.getItem(key)
    const value = strogeValueStr ? JSON.parse(strogeValueStr) : strogeValueStr

    return value
  }

  /**
   * @description: 获取对应的数据（取出设置的data）
   * @param {String} key
   * @return {any}
   */
  getItem(key: string): any {
    const value = this.getOriginItem(key)

    return value ? value.data : null
  }

  /**
   * @description: 移除指定键值
   * @param {String} key
   * @return {void}
   */
  removeItem(key: string) {
    this.storage.removeItem(key)
  }

  /**
   * @description: 移除过期数据
   * @param {String} key 指定名字
   * @param {Boolean} isExact 是否是全匹配（精确）
   * @return {void}
   */
  removeExpireItem(key: string, isExact = true) {
    const keyRE = isExact ? new RegExp(`^${key}$`) : new RegExp(`${key}`, 'g')
    const currentTimeStamp = Math.floor(Date.now() / 1000) // 当前时间
    Object.keys(this.storage).forEach(key => {
      if (!keyRE.test(key)) return

      const temp = this.getOriginItem(key)
      // 判断是否过期
      if (temp && temp.expire && temp.expire < currentTimeStamp) {
        this.removeItem(key)
      }
    })
  }

  /**
   * @description: 清除全部数据
   * @return {void}
   */
  clear() {
    this.storage.clear()
  }

  /**
   * @description: 判断当前key是否存在
   * @param {String} key
   * @return {Boolean}
   */
  isExistItem(key: string) {
    return this.getOriginItem(key) !== null ? true : false
  }

  /**
   * @description: 判断当前key是否过期
   * @param {String} key
   * @return {Boolean}
   */
  isExpire(key: string) {
    const currentTimeStamp = Math.floor(Date.now() / 1000) // 当前时间
    const value = this.getOriginItem(key)
    if (!value || !value.expire || value.expire <= currentTimeStamp) {
      return false
    }

    return true
  }
}

export const localStorage = new Storage(window.localStorage)
export const sessionStorage = new Storage(window.sessionStorage)