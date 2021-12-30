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
    // const urlOptions = { ...options }
    let url = `${baseLink}${endpoint}`

    // Object.keys(urlOptions).forEach((key) => {
    //   url += `${key}=${urlOptions[key]}&`
    // })
    return url
  }

  load(method, endpoint, callback, baseLink, preLoader) {
    if(preLoader.on()) preLoader.on()
    fetch(this.makeUrl(baseLink, endpoint), { method })
      .then(this.errorHandler)
      .then(async (res) => {
        const resLength = +res.headers.get('Content-Length')
        const readStream = res.body.getReader()
        let receivedLength = 0
        let chunks = []

        while (1) {
          const { done, value } = await readStream.read()

          if (done) {
            break
          }

          chunks.push(value)
          receivedLength += value.length

          console.log(`Получено ${receivedLength} из ${resLength}`)
        }

        const chunksAll = new Uint8Array(receivedLength)
        let position = 0

        for (let chunk of chunks) {
          chunksAll.set(chunk, position)
          position += chunk.length
        }

        const result = new TextDecoder('utf-8').decode(chunksAll)

        return JSON.parse(result)

        //return res.json()
      })
      .then((data) => {
        if(preLoader.off()) preLoader.off()
        return callback(data)
      })
      .catch((err) => console.error(err))
  }
}

export default Loader
