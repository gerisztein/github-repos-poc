<template lang="pug">
article.card
  header
    a(:href='ownerUrl', target='_blank')
      img.card__avatar(:src='ownerAvatar', :title='owner')

    h1.card__title
      a(:href='repoUrl', v-text='repoName')

  .card__stats
    .card__stat.card__stat--star(@click='starRepo')
      ui-icon(icon='star', :class='{ "has_star": isStarred }')
      span.card__stat--count(v-text='formatNumber(stars)')

    .card__stat
      ui-icon(icon='watch')
      span.card__stat--count(v-text='formatNumber(watchers)')

    .card__stat
      ui-icon(icon='fork')
      span.card__stat--count(v-text='formatNumber(forks)')

    .card__tags
      .card__language(v-if='language', v-text='language')

  p.card__description(v-if='description', v-text='description')

  footer
    span.card__license(v-if='license', v-text='license')
    span.card__updated(v-if='lastUpdate', v-text='lastUpdate')
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import UiIcon from './ui/UiIcon'
import * as types from '@/store/mutation-types'

export default {
  name: 'RepositoryCard',
  components: {
    UiIcon
  },
  props: {
    description: {
      type: String,
      required: false,
      default: ''
    },
    forks: {
      type: Number,
      required: true,
      default: 0
    },
    id: {
      type: Number,
      required: true,
      default: 0
    },
    language: {
      type: String,
      required: true,
      default: ''
    },
    license: {
      type: String,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    owner: {
      type: String,
      required: true,
      default: ''
    },
    ownerAvatar: {
      type: String,
      required: true,
      default: ''
    },
    ownerUrl: {
      type: String,
      required: true,
      default: ''
    },
    repoUrl: {
      type: String,
      required: true,
      default: ''
    },
    stars: {
      type: Number,
      required: true,
      default: 0
    },
    updated: {
      type: String,
      required: true,
      default: ''
    },
    watchers: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data () {
    return {
      isStarred: this.checkStar(),
      repoName: `${this.owner}/${this.name}`
    }
  },

  computed: {
    ...mapGetters(['starredRepos']),

    lastUpdate () {
      const date = moment(this.updated).format('LLL')

      return `Last update: ${date}`
    }
  },

  methods: {
    ...mapActions(['getStarredRepos']),

    formatNumber: (value) => value.toLocaleString(),

    checkStar () {
      const localStorage = window.localStorage
      let repos = localStorage.getItem('starredRepos') || []

      if (repos && repos.length) {
        repos = JSON.parse(repos)
      }

      return repos.some(i => i.id === this.id)
    },

    starRepo () {
      let repos = this.starredRepos || []
      let repo = null
      let isStarred = false

      if (repos && repos.length) {
        isStarred = repos.some(i => i.id === this.id)
      }

      if (!isStarred) {
        this.isStarred = true
        repo = {
          description: this.description,
          forks: this.forks,
          id: this.id,
          language: this.language,
          license: this.license,
          name: this.name,
          owner: this.owner,
          ownerAvatar: this.ownerAvatar,
          ownerUrl: this.ownerUrl,
          repoUrl: this.repoUrl,
          stars: this.stars,
          updated: this.updated,
          watchers: this.watchers
        }
      }

      if (isStarred) {
        repos.splice(repos.findIndex((item) => item.id === this.id), 1)
        this.isStarred = false
      }

      if (repo) {
        repos.push(repo)
      }

      this.getStarredRepos(repos)
      window.localStorage.setItem('starredRepos', JSON.stringify(repos))
      this.$store.commit(types.SET_STARRED_LIST, repos)
      this.$store.commit(types.SET_STARRED_COUNT, repos.length)
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  border-top 1px solid #efefef
  display flex
  // flex-basis 100%
  flex-flow column
  margin 8px 0
  padding 16px
  transition all .25s

  header
    align-items center
    display flex
    flex-direction row
    justify-content flex-start
    margin-bottom 8px

  &__avatar
    height 50px
    margin-right 16px
    width @height

  &__title
    font-size 1.5rem
    margin 0 16px 8px 0

  &__description
    display -webkit-box
    font-size 1rem
    margin 0 0 16px 65px
    overflow hidden
    text-overflow ellipsis
    -webkit-line-clamp 4
    -webkit-box-orient vertical

  footer
    font-size .65rem

  &__language
    background #def
    border-radius 4px
    display inline-block
    font-size .65rem
    font-weight 700
    height 20px
    line-height @font-size * 2
    padding 0 8px
    vertical-align middle

  &__stats
    align-items flex-start
    display flex
    margin 0 0 16px 65px

  &__stat
    align-items center
    display flex
    flex-flow row
    height 20px
    margin-right 32px

    &--star
      cursor pointer

    span
      font-size .75rem
      font-weight 700
      padding 0

  &__license, &__updated
    font-size .75rem
    margin-left 65px

  a
    transition all .25s

    &:link
      text-decoration none

    &:hover
      text-decoration underline

</style>
