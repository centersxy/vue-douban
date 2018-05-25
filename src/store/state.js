import {loadSearch, loadWantedFilm,loadWatchFilm} from "../common/js/cache"
const state = {
  movie: {},   //当前的电影信息
  currentReviewId: 0,   //  影评的id
  discussType: '',   //  短评 || 长评
  searchHistory: loadSearch(), //搜索历史
  wantMovies: loadWantedFilm(), //想看
  watchMovies: loadWatchFilm()  //看过
}

export default state
