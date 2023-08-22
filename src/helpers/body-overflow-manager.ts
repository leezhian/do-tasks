/*
 * @Author: kim
 * @Date: 2023-08-23 01:35:19
 * @Description: 管理body overflow
 */
class BodyOverflowManager {
  private updaters = new Set<BodyOverflowUpdater>()

  addUpdater(updater: BodyOverflowUpdater) {
    this.updaters.add(updater)
  }

  removeUpdater(updater: BodyOverflowUpdater) {
    this.updaters.delete(updater)
  }
  
  checkOverflow() {
    const overflow = Array.from(this.updaters).some(updater => updater.getCurrentOverflow())
    document.body.classList.toggle('overflow-hidden', overflow)
  }
}

const bodyOverflowManager = new BodyOverflowManager()


class BodyOverflowUpdater {
  private overflow = false
  constructor() {
    bodyOverflowManager.addUpdater(this)
  }

  setOverflow(overflow: boolean) {
    if(this.overflow === overflow) return
    this.overflow = overflow
    bodyOverflowManager.checkOverflow()
  }

  getCurrentOverflow() {
    return this.overflow
  }

  destroy() {
    bodyOverflowManager.removeUpdater(this)
    bodyOverflowManager.checkOverflow()
  }
}

export default BodyOverflowUpdater