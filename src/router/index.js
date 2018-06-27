import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import StarredRepos from '@/components/StarredRepos'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: route => ({
        date: route.query.date,
        languages: route.query.langs,
        order: route.query.order,
        page: +route.query.page,
        sort: route.query.sort
      })
    },
    {
      path: '/starred',
      name: 'StarredRepos',
      component: StarredRepos
    }
  ]
})
