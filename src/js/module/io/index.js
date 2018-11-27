import io from '@fedor/io'

// const apiPrefix = 'http://192.168.220.192:12345/arklifter'
const apiPrefix = '/syApi'
const reSlashPrefix = /^\/+/

const resolveURL = (url) => {
  if (url.indexOf('http') !== -1) {
    return url
  }
  if (url.charAt(0) !== '/') {
    // return `/${url.replace(reSlashPrefix, '')}`
    return `${apiPrefix}/${url.replace(reSlashPrefix, '')}`
  }

  return url
}

/**
 * Resolve backend api url
 */
export { resolveURL }

/**
 * Set io default instance resolveUrl globally
 */
io.config.resolveURL = resolveURL

// io.config.emulateJSON = false
const _propRequest = io.request

// Add a local request interceptor
io.request = (spec) => {
  return _propRequest.call(io, spec)
}

// Global response interceptor registion
io.interceptors.response.use(
  response => {
    return response
  }, error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

// Global request interceptor registion
io.interceptors.request.use(
  config => {
    let { method } = config
    if (method === 'get') {
      config.params = Object.assign({}, config.params, {
        _t: Math.random()
      })
    }
    return config
  }, error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default io
