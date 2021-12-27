import Items from './view/items'

export class AppView {
  constructor() {
    this.items = new Items()
  }

  drawItems(data) {
    this.items.draw(data)
  }
}

export default AppView
