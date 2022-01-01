class Loader {
  
  getResp(
    endpoint,
    baseLink,
    callback = () => {
      console.error('No callback for GET response')
    },
    preLoader
  ) {
    this.load('GET', endpoint, callback, baseLink, preLoader)
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

  makeUrl(baseLink, endpoint) {
   return`${baseLink}${endpoint}`
  }

  load(method, endpoint, callback, baseLink, preLoader) {
    if(preLoader.on()) preLoader.on()
    fetch(this.makeUrl(baseLink, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => {
        if(preLoader.off()) preLoader.off()
        return callback(data)
      })
      .catch((err) => console.error(err))
  }
}

export default Loader
