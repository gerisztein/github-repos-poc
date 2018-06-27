<template lang="pug">
.pagination
  ul
    li(v-if='currentPage !== 1') Previous
    li(
      v-for='page in pages',
      v-text='page',
      @click='goTo(page)'
      :class='{ active: currentPage === page }'
    )
    li(v-if='currentPage !== totalPages') Next
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    totalPages: {
      type: Number,
      required: true,
      default: 0
    }
  },

  computed: {
    currentPage () {
      return +this.$route.query.page
    },

    pages () {
      if (this.totalPages <= 5) {
        return +this.totalPages
      }

      if (this.totalPages > 10) {
        return [1, 2, 3, 4, 5, '...', this.totalPages - 1, this.totalPages]
      }
    }
  },

  methods: {
    goTo (page) {
      console.log('go to page #', page)
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination
  ul
    border 1px solid #ccc
    border-radius 4px
    list-style none
    margin 0 0 16px
    padding 0

  li
    border-left 1px solid #ccc
    color #0366d6
    cursor pointer
    display inline-block
    font-weight 700
    padding 8px 12px

    &.active
      background #0366d6
      color #fff

    &:first-child
      border-left 0

    &:hover
      background #eff3f6
</style>
