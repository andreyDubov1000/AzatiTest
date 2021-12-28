import FilteredItems from './filters/filters'

export class AppView {
  constructor() {
    this.items = new FilteredItems()
  }

  drawItems(cards, pattern) {
    if (cards) cards = cards.length > 30 ? cards.filter((_item, idx) => idx < 30) : cards
    this.items.sortItems(cards, pattern)
  }
}

export default AppView
