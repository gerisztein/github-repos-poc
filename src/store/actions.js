import * as types from './mutation-types'
import APIWrapper from '@/api'
import moment from 'moment'

const API = new APIWrapper()

const actions = {
  getRepositoriesList ({ commit }, query) {
    commit(types.SET_LIST, null)

    return API.repositories.getRepositoriesList(query)
      .then(data => commit(types.SET_LIST, data))
      .catch(err => commit(types.SET_LIST, err))
  },

  getStarredRepos ({ commit, dispatch }) {
    let repos = window.localStorage.getItem('starredRepos')

    if (repos) {
      repos = JSON.parse(repos)
    } else {
      repos = []
    }

    dispatch('setStarredRepos', repos)
  },

  setQuery ({ commit }, params) {
    const lastWeek = moment().subtract(7, 'days').format('YYYY-MM-DD')
    const query = {
      langs: '',
      order: 'desc',
      page: 1,
      date: lastWeek,
      sort: 'stars'
    }

    if (Object.keys(params).length) {
      query.date = params.date
      query.order = params.order
      query.page = params.page
      query.sort = params.sort
      query.langs = params.lang
    }

    const queryParams = {
      q: `created:>${lastWeek}`,
      order: query.order,
      page: query.page,
      sort: query.sort
    }

    if (params.langs) {
      console.log('params.langs', params)
      queryParams.q = `${queryParams.q} language=${params.langs}`
      query.langs = params.langs
    }

    commit(types.SET_QUERY_PARAMS, query)
    commit(types.SET_QUERY, queryParams)
  },

  setRepositoriesSorting ({ commit, state, dispatch }, data) {
    const query = state.queryParams
    query.order = data[1]
    query.sort = data[0]

    dispatch('setQuery', query)
    dispatch('getRepositoriesList', state.query)
  },

  setStarredRepos ({ commit }, repos) {
    commit(types.SET_STARRED_LIST, repos)
    commit(types.SET_STARRED_COUNT, repos ? repos.length : 0)
  },

  setStarredReposSorting ({ commit, state }, query) {
    commit(types.SET_STARRED_SORT, query)

    const sort = query[0]
    const order = query[1]

    state.starred.items.sort((a, b) => {
      let propA = a[sort]
      let propB = b[sort]

      if (sort === 'updated') {
        propA = new Date(propA)
        propB = new Date(propB)
      }

      if (order === 'desc') {
        return propB - propA
      }

      return propA - propB
    })
  }
}

export default actions
