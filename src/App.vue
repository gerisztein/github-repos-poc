<template lang="pug">
  #app
    header.main__header
    .container
      ui-tabs
      .app
        router-view
</template>

<script>
import UiTabs from './components/ui/UiTabs'
export default {
  name: 'App',
  components: {
    UiTabs
  }
}
</script>

<style lang="stylus">
body
  font-family -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
  color #2c3e50
  margin 0
  padding 0
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.main__header
  background #515151
  height 45px
  margin-bottom 16px
  position sticky
  top 0
  width 100vw

.container
  margin 0 auto
  max-width 960px

.app
  display flex
  flex-direction row

.main
  flex-grow 1
</style>
