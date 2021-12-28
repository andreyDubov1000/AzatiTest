import Items from '../view/items'

class Filters extends Items {
  sortItems(cards, pattern) {
    if (cards)
      cards.sort((a, b) => {
        switch (pattern) {
          case 'AtoZ':
            return a.name.localeCompare(b.name)
          case 'ZtoA':
            return b.name.localeCompare(a.name)
          case 'min-max':
            return new Date(`${a.created_at}`) - new Date(`${b.created_at}`)
          case 'max-min':
            return new Date(`${b.created_at}`) - new Date(`${a.created_at}`)
          case 'Up-min-max':
            return new Date(`${a.updated_at}`) - new Date(`${b.updated_at}`)
          case 'Up-max-min':
            return new Date(`${b.updated_at}`) - new Date(`${a.updated_at}`)
        }
      })
    this.draw(cards)
  }
}
export default Filters
