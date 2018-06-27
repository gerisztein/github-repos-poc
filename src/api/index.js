import CONFIG from './config'
import repositories from './repositories'

export default class ApiWrapper {
  constructor (options = {}) {
    this.baseURL = options.baseURL || CONFIG.baseURL
    this.repositories = repositories.bind(this)()
  }

  request (endpoint, query, headers = {}) {
    if (query.page > 34) {
      const error = {
        error: true,
        message: 'Only the first 1000 search results (34 pages) are available'
      }

      return new Promise((resolve, reject) => reject(error))
    }

    const url = new URL(`${this.baseURL}${endpoint}`)

    if (query) {
      Object.keys(query).forEach(key => url.searchParams.append(key, query[key]))
    }

    return fetch(url, headers)
      .then(data => data.json())
      .catch((rej) => {
        console.error('rej', rej)
      })
  }
}
