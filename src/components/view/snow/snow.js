import './snow.css'
import Snowflake from './snowflakes'

class Snow {
  constructor(num = 100) {
    this.snowflakes = []
    this.numberOfSnowflakes = num
    this.resetPosition = false
    this.enableSnowing = false
  }

  getPosition = (offset, size) => Math.round(Math.random() * (size + 2 * offset) - offset)

  generateSnowflakes() {
    const fragmentContainer = document.createDocumentFragment()
    const snowflake = document.createElement('div')
    const browserWidth = window.innerWidth

    snowflake.classList.add('snowflake')
    for (let i = 0; i < this.numberOfSnowflakes; i++) {
      const snowflakeClone = snowflake.cloneNode(true)

      fragmentContainer.append(snowflakeClone)

      const initialXPos = this.getPosition(50, browserWidth)
      const initialYPos = -50
      const speed = 10 + Math.random() * 50
      const snowflakeObject = new Snowflake(snowflakeClone, speed, initialXPos, initialYPos)

      this.snowflakes.push(snowflakeObject)
    }
    const setResetFlag = () => {
      this.resetPosition = true
    }

    window.addEventListener('resize', setResetFlag, false)
    return fragmentContainer
  }

  moveSnowflakes() {
    this.enableSnowing = !this.enableSnowing
    const onRequestAnimation = () => {
      const browserWidth = window.innerWidth
      const windowHeight = window.innerHeight

      this.snowflakes.forEach((snowflake) => {
        if (snowflake.yPos > windowHeight) {
          snowflake.element.style.opacity = '0'
          snowflake.yPos = -50
        }
        snowflake.update()
      })

      if (this.resetPosition) {
        this.snowflakes.forEach((snowflake) => {
          snowflake.xPos = this.getPosition(50, browserWidth)
          snowflake.yPos = this.getPosition(50, windowHeight)
        })

        this.resetPosition = false
      }
      if (this.enableSnowing) {
        requestAnimationFrame(onRequestAnimation)
      } else {
        this.snowflakes.forEach((snowflake) => {
          snowflake.element.style.opacity = '0'
          snowflake.yPos = -50
        })
      }
    }

    onRequestAnimation()
  }
}
export default Snow
