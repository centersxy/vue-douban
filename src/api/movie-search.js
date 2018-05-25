import axios from 'axios'
import { commonParams } from "./config"


// 标签搜索
export function tagSearch(tag, start, count) {
  const url ='/v2/movie/search'
  const data = Object.assign({}, commonParams, {
    tag,
    start,
    count
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}


// 关键字
export function movieSearch(query, start, count) {
  const url ='/v2/movie/search'
  const data = Object.assign({} ,commonParams, {
    q: query,
    start,
    count
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
