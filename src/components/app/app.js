import AppController from '../loader/controller'
import AppView from '../view/appView'
import PreLoader from '../preLoader/preloader'
import Snow from '../view/snow/snow'

class App {
  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
    this.preLoader = new PreLoader()
    this.snow = new Snow()
  }

  start() {
    const search = document.querySelector('.search')
    const sort = document.querySelector('.sort-select')
    const button = document.querySelector('.result-button')
    const snowButton = document.querySelector('.snow-button')
    const audioButton = document.querySelector('.audio-button')
    const snowflakeContainer = document.querySelector('.snowflake-container')
    const audio = new Audio('./assets/wav/Cutscene_03_Jinglebells.mp3')

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

    const onInput = debounce(onSearch, 1000)
    search.addEventListener('input', onInput)

    const onSortSelect = () => {
      this.view.drawItems(dataItems, sort.value)
    }

    sort.addEventListener('change', onSortSelect)

    const onCardClick = (event) => {
      const target = event.target
      const card = target.closest('.card')

      if (card && card.dataset.url) {
        const url = card.dataset.url
        const drawInfo = (data) => this.view.drawInfo(data)

        this.controller.getInfo(url, drawInfo, this.preLoader)
      }
    }

    this.view.items.container.addEventListener('click', onCardClick)

    const onButton = () => {
      this.view.items.container.classList.toggle('hide')
      this.view.info.container.classList.toggle('hide')
    }

    button.addEventListener('click', onButton)

    const onSnowButton = () => {
      snowButton.classList.toggle('snow-active')
      this.snow.moveSnowflakes()
    }

    snowflakeContainer.append(this.snow.generateSnowflakes())
    snowButton.addEventListener('click', onSnowButton)

    const onAudiButton = () => {
      let isPlay = false
      return () => {
        isPlay = !isPlay
        audioButton.classList.toggle('audio-active')
        audio.loop = true
        audio.volume = 0.4
        if (isPlay) {
          audio.play()
        } else {
          audio.pause()
        }
      }
    }

    audioButton.addEventListener('click', onAudiButton())
  }
}

export default App
