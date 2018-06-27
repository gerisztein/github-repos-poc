import * as types from './mutation-types'

const mutations = {
  [types.SET_LIST] (state, payload) {
    state.repositoriesList = payload
  },

  [types.SET_QUERY] (state, payload) {
    state.query = payload
  },

  [types.SET_QUERY_PARAMS] (state, payload) {
    state.queryParams = payload
  },

  [types.SET_STARRED_LIST] (state, payload) {
    state.starred.items = payload
  },

  [types.SET_STARRED_COUNT] (state, payload) {
    state.starred.count = payload
  },

  [types.SET_STARRED_SORT] (state, payload) {
    state.starred.sort = payload
  }
}

export default mutations
