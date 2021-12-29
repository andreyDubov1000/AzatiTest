import Loader from './loader'

class AppController extends Loader {
  getList(endpoint, callback) {
    super.getResp(endpoint, 'https://api.github.com/search/repositories?q=', callback)
  }

  getInfo(url, callback) {
    super.getResp('', url, callback)
  }
}
export default AppController
