import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  query: null,
  queryParams: {},
  repositoriesList: [],
  starred: {
    items: [],
    count: 0,
    sort: ['stars', 'desc']
  }
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
