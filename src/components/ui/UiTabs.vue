<template lang="pug">
  section.tabs
    router-link(:to='goTo("Home")', :class='{ active: $route.name === "Home" }')
      span Results

    router-link(:to='goTo("StarredRepos")', exact)
      span Starred
      span.counter(v-text='starredReposCount')
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Tabs',

  computed: {
    ...mapGetters(['starredReposCount'])
  },

  mounted () {
    this.getStarredRepos()
  },

  methods: {
    ...mapActions(['getStarredRepos']),
    goTo (route) {
      return {
        name: route
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs
  background #fff
  border-bottom 1px solid #efefef
  flex-basis 100%
  margin 0 0 32px
  position sticky
  top 45px

  a
    border-bottom 2px solid transparent
    color #515151
    display inline-block
    margin-right 16px
    padding 8px 32px 16px
    text-decoration none
    transition all .25s

    &.router-link-exact-active,
    &.active
      border-color #000
      font-weight 700

    &:hover
      border-color #efefef

  .counter
    &:after
      content: ')'
    &:before
      content: ' ('
</style>
