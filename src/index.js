import './reset.css'
import './style.css'
import AppController from './components/loader/controller'
import AppView from './components/appView'

class App {
  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
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
        this.controller.getList(search.value, (data) => {
          dataItems = data && data.items ? data.items : []
          console.log(data.items)
          this.view.drawItems(dataItems, sort.value)
        })
      }
      if (search.value.length === 0) this.view.drawItems()
    }

    const onSortSelect = () => {
      this.view.drawItems(dataItems, sort.value)
    }

    const onInput = debounce(onSearch, 600)

    const onCardClick = (event) => {
      const target = event.target
      const card = target.closest('.card')

      if (card && card.dataset.url) {
        const url = card.dataset.url
        this.controller.getInfo(url, (data) => {
          console.log(data)
          this.view.drawInfo(data)
        })
      }
    }

    const onButton = (event) => {
      this.view.items.container.classList.toggle('hide')
      this.view.info.container.classList.toggle('hide')
    }
    
    search.addEventListener('input', onInput)
    sort.addEventListener('change', onSortSelect)
    button.addEventListener('click', onButton)
    this.view.items.container.addEventListener('click', onCardClick)
  }
}

const app = new App()
app.start()
