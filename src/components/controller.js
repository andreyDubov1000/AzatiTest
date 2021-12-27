import AppLoader from './appLoader'

class AppController extends AppLoader {
  getList(endpoint, callback) {
    super.getResp(endpoint, {}, callback)
  }

  getInfo(e, callback) {}
}
export default AppController
