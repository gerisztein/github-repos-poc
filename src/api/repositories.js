import config from './config.js'

export default function entries () {
  return {
    getRepositoriesList: (query) => this.request(config.repositories, query)
  }
}
