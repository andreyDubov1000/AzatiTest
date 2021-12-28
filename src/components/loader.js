class Loader {
  constructor(baseLink) {
    this.baseLink = baseLink
  }

  getResp(
    endpoint,
    options = {},
    callback = () => {
      console.error('No callback for GET response')
    }
  ) {
    this.load('GET', endpoint, callback, options)
  }

  errorHandler(res) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`)
      if (res.status === 403) console.log(`Sorry, too fast request}`)
      throw Error(res.statusText)
    }

    return res
  }

  makeUrl(options, endpoint) {
    // const urlOptions = { ...options }
    let url = `${this.baseLink}${endpoint}`

    // Object.keys(urlOptions).forEach((key) => {
    //   url += `${key}=${urlOptions[key]}&`
    // })
    return url
  }

  load(method, endpoint, callback, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err))
  }
}

export default Loader
