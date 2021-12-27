import './style.css'
import AppController from './components/controller'
import AppView from './components/appView'

class App {
  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  start() {
    const search = document.querySelector('.search')

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
          console.log(data.items)
          this.view.drawItems(data)
        })
      }
      if (search.value.length === 0) console.log('пусто')
    }
    const onInput = debounce(onSearch, 500)
    search.addEventListener('input', onInput)

  }
}

const app = new App()
app.start()
