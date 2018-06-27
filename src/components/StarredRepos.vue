<template lang="pug">
section.repositories
  template
    header
      .counter(v-html='counter')
      ui-sorting(
        v-if='hasRepos',
        @change='setStarredReposSorting',
        :selected='starredReposSort'
      )

    .repositories__container(v-if='hasRepos')
      ui-filters(
          @change='setFilters',
          :options='availableFilters',
          :selected='selectedFilters'
        )

      section.list
        template(
          v-if='hasRepos',
          v-for='(repo, index) in starredRepos'
        )
          repository-card(
            :description='repo.description',
            :forks='repo.forks',
            :forks_url='repo.forks_url',
            :id='repo.id',
            :key='repo.id',
            :language='repo.language || ""',
            :license='repo.license',
            :name='repo.name',
            :owner='repo.owner',
            :ownerAvatar='repo.ownerAvatar',
            :ownerUrl='repo.ownerUrl',
            :repoUrl='repo.repoUrl',
            :stars='repo.stars',
            :stars_url='repo.stargazers_url',
            :updated='repo.updated',
            :watchers='repo.watchers',
            @updateList='updateList'
          )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RepositoryCard from './RepositoryCard'
import UiFilters from './ui/UiFilters'
import UiSorting from './ui/UiSorting'

export default {
  name: 'StarredRepos',
  components: {
    RepositoryCard,
    UiFilters,
    UiSorting
  },

  data () {
    return {
      selectedFilters: []
    }
  },

  computed: {
    ...mapGetters(['starredRepos', 'starredReposCount', 'starredReposSort']),

    availableFilters () {
      if (this.starredRepos && this.starredRepos.length) {
        const languages = this.starredRepos
          .filter(i => i.language)
          .map(i => i.language)
          .sort()

        const filters = [
          {
            title: 'Languages',
            items: [...new Set(languages)]
          }
        ]

        console.log(filters)
        return filters
      }

      return []
    },

    counter () {
      if (this.starredRepos && this.starredRepos.length) {
        return `${this.starredRepos.length.toLocaleString()} repositories found`
      }

      return 'No starred repositories :('
    },

    hasRepos () {
      return this.starredRepos && this.starredRepos.length
    }
  },

  mounted () {
    this.getStarredRepos()
  },

  methods: {
    ...mapActions(['getStarredRepos', 'setStarredReposSorting']),

    updateList (payload) {
      this.getStarredRepos(payload)
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
    overflow auto

.counter
  font-size 1.5rem
  font-weight 700

.loading
  display flex
  justify-content center
  margin-top 25vh
  width 100vw
</style>
