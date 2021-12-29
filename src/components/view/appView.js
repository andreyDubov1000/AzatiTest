import FilteredItems from '../filters/filters'
import Info from './info/info'

export class AppView {
  constructor() {
    this.items = new FilteredItems()
    this.info = new Info()
  }

  drawItems(cards, pattern) {
    this.items.container.classList.remove('hide')
    this.info.container.classList.add('hide')
    this.items.sortItems(cards, pattern)
  }

  drawInfo(data) {
    this.info.container.classList.remove('hide')
    this.items.container.classList.add('hide')
    this.info.draw(data)
  }
}

export default AppView
