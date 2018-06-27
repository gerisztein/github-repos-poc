<template lang="pug">
  select(v-model='model', @change='selectSorting')
    option(value='').
      Select...
    template(v-for='(option, key) in options')
      option(
        :key='key',
        :value='option.value',
        v-text='option.title'
      )
</template>

<script>
export default {
  name: 'Sorting',

  props: {
    selected: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data () {
    return {
      model: this.selected,
      options: [
        {
          value: ['stars', 'desc'],
          title: 'Most stars'
        },
        {
          value: ['stars', 'asc'],
          title: 'Fewest stars'
        },
        {
          value: ['forks', 'desc'],
          title: 'Most forks'
        },
        {
          value: ['forks', 'asc'],
          title: 'Fewest forks'
        },
        {
          value: ['updated', 'desc'],
          title: 'Recently updated'
        },
        {
          value: ['updated', 'asc'],
          title: 'Least recently updated'
        }
      ]
    }
  },

  methods: {
    selectSorting () {
      this.$emit('change', this.model)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
