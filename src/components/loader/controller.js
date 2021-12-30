import Loader from './loader'

class AppController extends Loader {
  getList(endpoint, callback, preLoader) {
    super.getResp(endpoint, 'https://api.github.com/search/repositories?q=', callback, preLoader)
  }

  getInfo(url, callback, preLoader) {
    super.getResp('', url, callback, preLoader)
  }
}
export default AppController
