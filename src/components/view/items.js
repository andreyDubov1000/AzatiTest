import './items.css'

class Items {
  draw(data) {
    const cards = data.items.length >= 30 ? data.items.filter((_item, idx) => idx < 30) : data.items
    const cardContainer = document.querySelector('.card-container')
    const fragment = document.createDocumentFragment()

    cards.forEach((item, idx) => {
      const template = document.createElement('template')

      const avatarUrl = item.owner['avatar_url']
      const name = item.name
      const htmlUrl = item.owner['html_url']
      const date = item.created_at.match(/(.+)T/)[1] // "2015-10-19T18:04:56Z"

      template.innerHTML = `<div class="card ${name}" data-url="${htmlUrl}">
        <h2 class="card-title">${name}</h2>
         <img class="card-img" src="${avatarUrl}" alt="toy"/>
         <div class="card-content">
            <p class="card-data">Создан:<span>${date}</span></p>
        </div>
        </div>`
      fragment.append(template.content)
    })
    if (cardContainer) {
      cardContainer.innerHTML = ''
      cardContainer.append(fragment)
    } else {
      throw new Error('DOM Элемент не найден. [class = ".card-container"]')
    }

    //     const fragment = document.createDocumentFragment()
    //     const newsItemTemp = document.querySelector('#newsItemTemp')

    //     news.forEach((item, idx) => {
    //       const newsClone = newsItemTemp.content.cloneNode(true)

    //       if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt')

    //       newsClone.querySelector('.news__meta-photo').style.backgroundImage = `url(${
    //         item.urlToImage || 'img/news_placeholder.jpg'
    //       })`
    //       newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name
    //       newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
    //         .slice(0, 10)
    //         .split('-')
    //         .reverse()
    //         .join('-')

    //       newsClone.querySelector('.news__description-title').textContent = item.title
    //       newsClone.querySelector('.news__description-source').textContent = item.source.name
    //       newsClone.querySelector('.news__description-content').textContent = item.description
    //       newsClone.querySelector('.news__read-more a').setAttribute('href', item.url)

    //       fragment.append(newsClone)
    //     })

    //     document.querySelector('.news').innerHTML = ''
    //     document.querySelector('.news').appendChild(fragment)
  }
}

export default Items
