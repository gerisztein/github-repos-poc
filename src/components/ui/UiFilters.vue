<template lang="pug">
section.filters
  fieldset
    template(v-for='filter in options')
      legend.filters__title(v-text='filter.title')

      .filters__options
        .filters__option(v-for='(item, key) in filter.items')
          label(:for='key')
            input(
              v-model='model',
              type='checkbox',
              :id='key',
              :value='item',
              @change='selectFilters'
            )
            span(v-text='item')
</template>

<script>
export default {
  name: 'Filters',

  data () {
    return {
      model: this.selected
    }
  },

  props: {
    options: {
      type: Array,
      required: false,
      default: () => [
        {
          title: 'Languages',
          items: [
            'C#',
            'C',
            'C++',
            'CSS',
            'Go',
            'Java',
            'Javascript',
            'Objective-C',
            'PHP',
            'Python',
            'Ruby',
            'Scala',
            'Shell',
            'Swift',
            'Typescript'
          ]
        }
      ]
    },

    selected: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  methods: {
    selectFilters () {
      this.$emit('change', this.model)
    }
  }
}
</script>

<style lang="stylus" scoped>
.filters
  align-self flex-start
  height fit-content
  margin 0 40px 0 0
  min-width 180px
  padding 0
  position inherit
  top 50px
  width 180px

  fieldset
    border 1px solid #efefef
    margin 0
    padding 16px

  &__title
    font-size 1.25rem
    font-weight 700

  &__option
    font-size .75rem
    margin-bottom 4px

    input
      cursor pointer
      margin-right 8px

    label
      cursor pointer
.filter
  &__option
    align-items center
    display flex
    flex-flow row
    flex-grow 1

    span
      font-size .75rem
      margin-left 8px
</style>
