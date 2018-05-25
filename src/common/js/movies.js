// 创建电影类
export default class Movies {
  constructor({id, title, director, casts, genres, collectCount, rating, image, date, pubdates, subtype}) {
    this.id = id; // id
    this.title = title; // 名称
    this.director = director; //导演
    this.casts = casts; // 演员
    this.genres = genres; // 类型
    this.collectCount = collectCount || 0;
    this.rating = rating;
    this.image = image;
    this.date = date || ''; // 用于显示即将上映的电影是否待定
    this.pubdates = pubdates || ''; // 用于电影详情的上映日期
    this.subtype = subtype || ' ';
  }
}

// 创建电影类的信息
export function creatMovieList(movieList) {
  let ret = []
  movieList.forEach((m) => {
    ret.push(new Movies({
      id: m.id,
      title: m.title,
      director: filterDirector(m.directors),
      casts: filterCasts(m.casts),
      collectCount: m.collect_count,
      rating: m.rating.average,
      image: m.images.large,
      date: filterDate(m.mainland_pubdate, m.pubdates),
      pubdates: m.pubdates
    }))
  })
  return ret
}

// 创建搜索的电影类信息
export function creatSearchList(movieList) {
  let ret = [];
  movieList.forEach((m) => {
    ret.push(new Movies({
      id: m.id,
      title: m.title,
      director: filterDirector(m.directors),
      casts: filterCasts(m.casts),
      genres: filterGenres(m.genres),
      rating: m.rating.average,
      image: m.images.small,
      pubdates: m.pubdates,
      subtype: m.subtype
    }))
  })
  return ret
}

// 处理导演的名称
function filterDirector(director) {
  return director.length ? director[0].name : 0
}

// 处理演员的名称
function filterCasts(casts) {
  let ret = ''
  casts.forEach((item, index) => {
    if (index < casts.length - 1) {
      ret += `${item.name}/`
    } else {
      ret += item.name
    }
  })
  return ret
}

// 处理电影类型
function filterGenres(genres) {
  return genres.join('/');
}
// 格式化日期

function filterDate(date, pubdates) {
  if (!date) {
    return findDateTime(pubdates)
  } else {
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let currentWeek = week[new Date(date).getDay()]
    return date + ' ' + currentWeek
  }
}

function findDateTime(date) {
  let ret = '';
  const key = '中国大陆'
  date.forEach((item) => {
    let index = item.indexOf(key)
    if (index > 0) { // 检索的字符串值没有出现，则该方法返回 -1。
      let reg = /([(][^(]+)$/;
      ret = item.replace(reg, "");
    }
  });
  return ret +  '待定';
}

