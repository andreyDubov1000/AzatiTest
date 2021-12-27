import Loader from './loader'

class AppLoader extends Loader {
  constructor() {
    super('https://api.github.com/search/repositories?q=', {})
  }
}

export default AppLoader
