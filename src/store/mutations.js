import * as types from './mutation-types'
const mutations = {
  [types.SET_MOVIE](state, movie) {
    state.movie = movie
  },
  [types.SET_REVIEW_ID](state, id) {
    state.currentReviewId = id
  },
  [types.SET_DISCUSS_TYPE](state, type) {
    state.discussType = type
  },
  [types.SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.WANT_MOVIE](state, want) {
    state.wantMovies = want
  },
  [types.WATCH_MOVIE](state, watch) {
    state.watchMovies = watch
  }
}

export default mutations
