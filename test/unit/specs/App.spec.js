import { shallow, createLocalVue } from 'vue-test-utils'
import App from '@/App'

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(App, {
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

})
