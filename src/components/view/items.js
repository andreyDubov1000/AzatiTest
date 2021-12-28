import './items.css'

class Items {
  draw(cards) {
    const cardContainer = document.querySelector('.card-container')
    const fragment = document.createDocumentFragment()

    const localeTime = 'en-GB'

    function showDate(date, loc) {
      const options = { month: 'long', year: 'numeric', day: 'numeric' }
      return date.toLocaleDateString(loc, options)
    }

    cardContainer.innerHTML = ''
    if (cards) {
      cards.forEach((item) => {
        const template = document.createElement('template')
        const avatarUrl = item.owner['avatar_url']
        const name = item.name
        const htmlUrl = item.owner['html_url']
        const date = showDate(new Date(`${item.created_at}`), localeTime)
        const update = showDate(new Date(`${item.updated_at}`), localeTime)

        template.innerHTML = `<div class="card ${name}" data-url="${htmlUrl}">
        <h2 class="card-title">${name}</h2>
         <img class="card-img" src="${avatarUrl}" alt="toy"/>
         <div class="card-content">
            <p class="card-data">Создан:<span>${date}</span></p>
            <p class="card-data">Обновлен:<span>${update}</span></p>
        </div>
        </div>`
        fragment.append(template.content)
      })
    }

    if (cardContainer) {
      cardContainer.append(fragment)
    } else {
      throw new Error('DOM element not found. [class = ".card-container"]')
    }
  }
}

export default Items
