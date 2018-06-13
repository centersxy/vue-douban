import * as types from './mutation-types'
import {saveSearch, deleteSearch, cleanSearch, saveWantMovie, saveWatchMovie ,saveLikeComment} from "../common/js/cache"

// add
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SEARCH_HISTORY, saveSearch(query))
}

// del

export const delSearchHistory = function ({commit}, query) {
  commit(types.SEARCH_HISTORY,deleteSearch(query))
}

// remove

export const cleanSearchHistory = function ({commit}) {
  commit(types.SEARCH_HISTORY, cleanSearch())
}

/*  想看电影 */

export const saveWantHistory = function ({commit}, movie) {
  commit(types.WANT_MOVIE, saveWantMovie(movie))
}

export const saveWatchHistory = function ({commit}, movie) {
  commit(types.WATCH_MOVIE, saveWatchMovie(movie))
}

/*    点赞    */

export const saveLikeHistory = function ({commit}, id) {
  commit(types.LIKE_COMMENT, saveLikeComment(id))
}
