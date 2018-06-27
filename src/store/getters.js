const getters = {
  currentQuery: (state) => state.query,
  currentQueryParams: (state) => state.queryParams,
  repositoriesList: (state) => state.repositoriesList,
  starredRepos: (state) => state.starred.items,
  starredReposCount: (state) => state.starred.count,
  starredReposSort: (state) => state.starred.sort
}

export default getters
