import storage from 'good-storage'


/*
 * 搜索
 */
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

// 保存搜索
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 首次应该从缓存中读取
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除当前搜索
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
// Remove All
export function cleanSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
/*
 * 收藏电影
 */
const WANT_MOVIE = '__wantFilm__'
const WANT_MAX_LEN = 10
export function saveWantMovie(movie) {
  const LEN = WANT_MAX_LEN
  let movies = storage.get(WANT_MOVIE, []) // 获取不到返回空数组
  // 查找是否存在该数据返回索引 没有返回 -1
  const index = movies.findIndex((item) => {
    return item.id === movie.id
  })
  if (index === -1) {
    movies.push(movie)
    // 超过最大长度删除第一个数据
    if (LEN && movies.length > LEN) {
      movies.shift()
    }
  } else {
    movies.splice(index, 1)
  }
  // 加入缓存并返回
  storage.set(WANT_MOVIE, movies)
  return movies
}

// 首次读取缓存
export function loadWantedFilm() {
  return storage.get(WANT_MOVIE, [])
}

/*
* 看过电影
*/
const WATCH_MOVIE = '__watchFilm__'
const WATCH_MAX_LEN = 5

export function saveWatchMovie(movie) {
  let LEN = WATCH_MAX_LEN
  let movies = storage.get(WATCH_MOVIE, []) // 首先读取缓存
  const index = movies.findIndex((item) => {
    return item.id === movie.id
  })
  if (index === -1 ) {
    movies.push(movie)
    //判断缓存长度,删除第一条数据
    if (LEN && movies.length > LEN) {
      movies.shift()
    }
  } else {
    movies.splice(index ,1)
  }
  //加入缓存并返回
  storage.set(WATCH_MOVIE, movies)
  return movies
}

export function loadWatchFilm() {
  return storage.get(WATCH_MOVIE, [])
}

/*
*  点赞
* */
const LIKE_COMMENT = '__likeComment__'
const LINK_MAX_LEN = 20

export function saveLikeComment(id) {
  let LEN = LINK_MAX_LEN
  let movies = storage.get(LIKE_COMMENT, [])
  const index = movies.findIndex((item) => {
    return item === id
  })
  if (index === -1) {
    movies.push(id)
    if (LEN && movies.length > LEN) {
      movies.shift()
    }
  } else {
    movies.splice(index, 1)
  }
  // 加入
  storage.set(LIKE_COMMENT, movies)
  return movies
}

export function loadLikeComment() {
  return storage.get(LIKE_COMMENT, [])
}
/*
*通用方法
*/
// 将信息插入缓存数组
function insertArray(arr, val, compare, maxLen) {
  // 查找缓存数组中是否包含添加的数据，返回索引
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  // 将新数据添加到最前面
  arr.unshift(val);
  // 超过最大长度时移除末尾数据
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

//  del
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}


