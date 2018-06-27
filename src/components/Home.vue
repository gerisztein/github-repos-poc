<template lang="pug">
  section.repositories
    template(v-if='repositoriesList')
      header
        .counter(v-html='counter')
        ui-sorting(
          @change='setSorting',
          :selected='sorting'
        )

      .repositories__container
        ui-filters(
          @change='setFilters',
          :selected='selectedFilters'
        )
        section.list
          template(
            v-if='repositoriesList.total_count',
            v-for='(repo, index) in repositoriesList.items'
          )
            repository-card(
              :description='repo.description',
              :forks='repo.forks_count',
              :forks_url='repo.forks_url',
              :id='repo.id',
              :language='repo.language || ""',
              :license='repo.license ? repo.license.name : ""',
              :name='repo.name',
              :owner='repo.owner.login',
              :ownerAvatar='repo.owner.avatar_url',
              :ownerUrl='repo.owner.html_url',
              :repoUrl='repo.html_url',
              :stars='repo.stargazers_count',
              :stars_url='repo.stargazers_url',
              :updated='repo.pushed_at',
              :watchers='repo.watchers_count',
            )
          template(v-else)
            h1.
              No results founds! :(
    template(v-else)
      .loading
        img(src='@/assets/loading.svg')
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RepositoryCard from './RepositoryCard'
import UiFilters from './ui/UiFilters'
import UiPagination from './ui/UiPagination'
import UiSorting from './ui/UiSorting'

export default {
  name: 'Home',
  components: {
    RepositoryCard,
    UiFilters,
    UiPagination,
    UiSorting
  },
  props: {
    date: {
      type: String,
      required: true,
      default: ''
    },
    languages: {
      type: String,
      required: false,
      default: ''
    },
    order: {
      type: String,
      required: true,
      default: 'desc'
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    sort: {
      type: String,
      required: true,
      default: 'stars'
    }
  },

  computed: {
    ...mapGetters([
      'currentQuery',
      'currentQueryParams',
      'repositoriesList'
    ]),

    counter () {
      if (this.repositoriesList && this.repositoriesList.total_count) {
        return `${this.repositoriesList.total_count.toLocaleString()} repositories found`
      }

      if (this.repositoriesList.error) {
        return this.repositoriesList.message
      }

      return `No repositories found :(`
    },

    selectedFilters () {
      if (this.currentQueryParams.langs) {
        return this.currentQueryParams.langs.split(',')
      }

      return []
    },

    sorting () {
      return [this.currentQueryParams.sort, this.currentQueryParams.order]
    },

    totalPages () {
      if (this.repositoriesList && this.repositoriesList.total_count) {
        return Math.ceil(this.repositoriesList.total_count / this.repositoriesList.items.length)
      }
    }
  },

  created () {
    this.search()
  },
  methods: {
    ...mapActions([
      'getRepositoriesList',
      'setQuery',
      'setRepositoriesSorting'
    ]),

    goTo (page) {
      this.$router.push({
        path: '/',
        query: {
          page: page.toString()
        }
      })
    },

    search () {
      if (!this.currentQuery) {
        let params = null

        if (this.$route.query) {
          params = this.$route.query
        }

        this.setQuery(params)
      }

      this.$router.push({
        path: '/',
        query: this.currentQueryParams
      })

      this.getRepositoriesList(this.currentQuery)
    },

    selectLanguage () {
      const query = this.currentQueryParams
      const langs = this.selectedLanguages.filter(Boolean)

      if (langs) {
        query.langs = langs.toString()
      }

      this.setQuery(query)
      this.search()
    },

    setFilters (filters) {
      const query = this.currentQueryParams
      const langs = filters.filter(Boolean)

      if (langs) {
        query.langs = langs.toString()
      }

      this.setQuery(query)
      this.search()
    },

    setSorting (sort) {
      this.setRepositoriesSorting(sort)
        .then(() => this.$router.push({
          name: 'RepositoriesList',
          query: this.currentQueryParams
        }))
    }
  }
}
</script>

<style lang="stylus" scoped>
.repositories
  display flex
  flex-flow column
  flex-grow 1
  overflow hidden

  header
    align-items center
    flex-direction row
    display flex
    justify-content space-between
    margin-bottom 16px
    margin-left 220px

  &__container
    display flex

.counter
  font-size 1.5rem
  font-weight 700

.loading
  display flex
  justify-content center
  margin-top 25vh
  width 100%
</style>
