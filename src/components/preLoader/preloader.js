import './preLoader.css'

class PreLoader {
  constructor() {
    this.container = document.querySelector('.preLoader')
  }
  on() {
    this.container.style.transition = '1s'
    this.container.classList.add('progress')
  }
  off() {
    this.container.classList.remove('progress')
  }
}
export default PreLoader
