import AppController from '../loader/controller'
import AppView from '../view/appView'
import PreLoader from '../preLoader/preloader'

class App {
  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
    this.preLoader = new PreLoader()
  }

  start() {
    const search = document.querySelector('.search')
    const sort = document.querySelector('.sort-select')
    const button = document.querySelector('.result-button')

    let dataItems = []

    const debounce = (fn, ms) => {
      let timout
      return function () {
        const fnCall = () => {
          fn.apply(this, arguments)
        }
        clearTimeout(timout)
        timout = setTimeout(fnCall, ms)
      }
    }

    const onSearch = () => {
      if (search.value.length > 1) {
        const drawItems = (data) => {
          dataItems = data && data.items ? data.items : []
          this.view.drawItems(dataItems, sort.value)
        }

        this.controller.getList(search.value, drawItems, this.preLoader)
      }
      if (search.value.length === 0) this.view.drawItems()
    }

    const onSortSelect = () => {
      this.view.drawItems(dataItems, sort.value)
    }

    const onInput = debounce(onSearch, 1000)

    const onCardClick = (event) => {
      const target = event.target
      const card = target.closest('.card')

      if (card && card.dataset.url) {
        const url = card.dataset.url
        const drawInfo = (data) => this.view.drawInfo(data)

        this.controller.getInfo(url, drawInfo, this.preLoader)
      }
    }

    const onButton = () => {
      this.view.items.container.classList.toggle('hide')
      this.view.info.container.classList.toggle('hide')
    }

    search.addEventListener('input', onInput)
    sort.addEventListener('change', onSortSelect)
    button.addEventListener('click', onButton)
    this.view.items.container.addEventListener('click', onCardClick)
  }
}

export default App
