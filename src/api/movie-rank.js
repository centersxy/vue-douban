import axios from 'axios'
import {commonParams} from "./config"

// top250
export function getTop250Rank(start, count) {
  const url = '/v2/movie/top250'
  const data = Object.assign({}, commonParams, {
    start,
    count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

// 新片榜
export function getWeeklyRank(start, count) {
  const url = '/v2/movie/new_movies'
  const data = Object.assign({}, commonParams, {
    start,
    count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
