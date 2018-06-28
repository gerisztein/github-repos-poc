import { shallow, createLocalVue } from 'vue-test-utils'
import RepositoryCard from '@/components/RepositoryCard'
import repositoriesList from './_RepositoriesList'
import 'jest-localstorage-mock'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import storeConfig from '@/store'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

describe('RepositoryCard.vue', () => {
  let actions
  let getters
  let store
  let wrapper

  const repo = repositoriesList.items[0]

  const props = {
    description: repo.description,
    forks: repo.forks_count,
    id: repo.id,
    language: repo.language || '',
    license: '',
    name: repo.full_name,
    owner: repo.owner.login,
    ownerAvatar: repo.owner.avatar_url,
    ownerUrl: repo.owner.html_url,
    repoUrl: repo.html_url,
    stars: repo.stargazers_count,
    updated: repo.pushed_at,
    watchers: repo.watchers_count
  }

  beforeEach(() => {
    jest.resetAllMocks()
    localStorage.clear()

    store = storeConfig
    wrapper = shallow(RepositoryCard, {
      store,
      localVue,
      propsData: props
    })
  })

  describe('smoke tests', () => {
    it('should render', () => expect(wrapper.exists()).toBe(true))
  })

  describe('render', () => {
    it('matches snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    it('formatNumber should format the number based on the locale', () => {
    expect(wrapper.vm.formatNumber(1000)).toEqual('1,000')
    })

    it('checkStar should be null', () => {
      expect(wrapper.vm.checkStar()).toBe(false)
    })

    it('should star a repo', () => {
      wrapper.vm.starRepo()

      const isStarred = store.getters.starredRepos.some(i => i.id == repo.id)
      expect(isStarred).toBe(true)
    })

    it('should unstar a repo', () => {
      wrapper.vm.starRepo()

      setTimeout(() => {
        wrapper.vm.starRepo()

        const isStarred = store.getters.starredRepos.some(i => i.id === repo.id)
        expect(isStarred).toBe(false)
      }, 500)
    })
  })

})
