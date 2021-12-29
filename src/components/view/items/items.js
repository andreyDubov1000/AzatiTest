import './items.css'
import Anime from './anime'

class Items {
  constructor() {
    this.container = document.querySelector('.card-container')
    this.anime = new Anime()
  }
  draw(cards) {
    const fragment = document.createDocumentFragment()
    const localeTime = 'en-GB'

    function showDate(date, loc) {
      const options = { month: 'long', year: 'numeric', day: 'numeric' }
      return date.toLocaleDateString(loc, options)
    }

    if (cards?.length) {
      cards.forEach((item) => {
        const template = document.createElement('template')
        const avatarUrl = item.owner['avatar_url']
        const name = item.name
        const reposUrl = item.owner['repos_url']
        const login = item.owner['login']
        const date = showDate(new Date(`${item.created_at}`), localeTime)
        const update = showDate(new Date(`${item.updated_at}`), localeTime)

        template.innerHTML = `<div class="card ${name}" data-url="${reposUrl}">
        <h2 class="card-title">${login}</h2>
         <img class="card-img" src="${avatarUrl}" alt="avatar"/>
         <div class="card-content">
            <p class="card-data">Имя:<span>${name}</span></p>
            <p class="card-data">Создан:<span>${date}</span></p>
            <p class="card-data">Обновлен:<span>${update}</span></p>
         </div>
        </div>`
        fragment.append(template.content)
      })
    } else {
      const template = document.createElement('template')
      template.innerHTML = `<div class="card">
      <h2 class="card-title"></h2>
       <img class="card-img" src="./assets/ninja-ninja-avatar.png" alt="toy"/>
       <div class="card-content">
          <p class="card-data"><span>К сожалению, мы ничего не нашли</span></p>
      </div>
      </div>`
      fragment.append(template.content)
    }

    if (this.container) {
      const oldCardsInfo = this.anime.getCardsInfo(this.container)
      this.container.innerHTML = ''
      this.container.append(fragment)
      const newCardsInfo = this.anime.getCardsInfo(this.container)
      this.anime.aminateCards(oldCardsInfo, newCardsInfo, 'url')
    } else {
      throw new Error('DOM element not found. [class = ".card-container"]')
    }
  }
}

export default Items
