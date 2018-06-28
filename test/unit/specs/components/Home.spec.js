import { shallow, createLocalVue } from 'vue-test-utils'
import Home from '@/components/Home'
import repositoriesList from './_RepositoriesList'
import Vuex from 'vuex'
import VueRouter from 'vue-router';

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

describe('Home.vue', () => {
  let actions
  let getters
  let store
  let wrapper

  const currentQueryParams = {
    langs: undefined,
    order: 'desc',
    page: '1',
    sort: 'stars'
  }

  const currentQuery = {
    order: 'desc',
    page: '1',
    query: 'created:>2018-06-20',
    sort: 'stars'
  }

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
  const router = new VueRouter({routes})

  beforeEach(() => {
    actions = {
      getRepositoriesList: jest.fn(),
      setQuery: jest.fn(),
      setRepositoriesSortin: jest.fn()
    }

    getters = {
      currentQuery: () => currentQuery,
      currentQueryParams: () => currentQueryParams,
      repositoriesList: () => repositoriesList
    }

    store = new Vuex.Store({
      state: {},
      actions,
      getters
    })

    wrapper = shallow(Home, {
      store,
      localVue,
      router,
      propsData: {
        languages: '',
        order: 'desc',
        page: 1,
        sort: 'stars'
      },
    })
  })

  describe('smoke tests', () => {
    it('should render', () => expect(wrapper.exists()).toBe(true))
  })

  describe('render', () => {
    it('matches snapshot', () => expect(wrapper.html()).toMatchSnapshot())
  })

  describe('vuex store', () => {
    it('repositories list exists', () => expect(store.getters.repositoriesList).toMatchObject(repositoriesList))
  })

})
