/*
 * @Author: kim
 * @Date: 2023-10-15 21:11:31
 * @Description: 滑动单元格状态管理
 */
export type SwiperListener = () => any

class SwiperObserver {
  private listeners: Map<string, SwiperListener>
  private currentSwiperId: string | null
  constructor() {
    this.currentSwiperId = null
    this.listeners = new Map()
  }

  listen(swiperId: string, listener: SwiperListener) {
    this.listeners.set(swiperId, listener)
  }

  remove(swiperId?: string) {
    if (!swiperId) {
      this.listeners.clear()
    } else {
      this.listeners.delete(swiperId)
    }
  }

  /**
   * @description: 同步状态
   * @param {string} swiperId
   * @return {void}
   */  
  sync(swiperId: string) {
    if(this.currentSwiperId === swiperId) return
    if(this.currentSwiperId && this.listeners.has(this.currentSwiperId)) {
      this.listeners.get(this.currentSwiperId)!()
    }
    this.currentSwiperId = swiperId
  }
}

export default new SwiperObserver()