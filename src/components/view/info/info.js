import './info.css'

class Info {
  constructor() {
    this.container = document.querySelector('.info-container')
  }
  draw(data) {
    if (data) {
      const fragment = document.createDocumentFragment()
      const ItemInfo = document.createElement('div')
      ItemInfo.classList.add('info')

      const avatarUrl = data[0].owner['avatar_url']
      const login = data[0].owner.login
      ItemInfo.innerHTML = ` <div class="ItemInfo-header">
    <h2 class="ItemInfo-title">Репозитории:</h2>
      <div class="ItemInfo-title-meta">
        <img  src="${avatarUrl}" alt="avatar"/>
        <div>
          <p>Логин:<span>${login}</span></p>
          <p>Количество репозиториев:<span>${data.length}</span></p>
        </div>
      </div> 
    </div>`
      const localeTime = 'en-GB'

      function showDate(date, loc) {
        const options = { month: 'long', year: 'numeric', day: 'numeric' }
        return date.toLocaleDateString(loc, options)
      }

      data.forEach((item) => {
        const template = document.createElement('template')
        const name = item.name
        const visibility = item.visibility
        const html_url = item.html_url
        const language = item.language || ''
        const description = item.description || ''
        const forking = item.allow_forking ? 'ДА' : 'НЕТ'

        const date = showDate(new Date(`${item.created_at}`), localeTime)
        const update = showDate(new Date(`${item.updated_at}`), localeTime)
        template.innerHTML = `<table class="table">
                  <thead>
                    <tr>
                      <th>Имя</th>
                      <th>Создан</th>
                      <th>Обновлен</th>
                      <th>Видимость</th>
                      <th>Языки</th>
                      <th>forking</th>
                      <th>Описание</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${name}</td>
                      <td>${date}</td>
                      <td>${update}</td>
                      <td>${visibility}</td>
                      <td>${language}</td>
                      <td>${forking}</td>
                      <td>${description}</td>
                    </tr>
                  </tbody>
                </table>
              <p class="info-read-more">
                <a href="${html_url}" target="_blank">Перейти в репозиторий</a>
              </p>`

        ItemInfo.append(template.content)
      })
      fragment.append(ItemInfo)

      if (this.container) {
        this.container.innerHTML = ''
        this.container.append(fragment)
      } else {
        throw new Error('DOM element not found. [class = ".info-container"]')
      }
    }
  }
}
export default Info
