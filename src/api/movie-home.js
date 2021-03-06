import axios from 'axios'
import {commonParams} from "./config"
// 正在热映
export function getMovie(start, count) {
  const url = '/v2/movie/in_theaters';
  const data = Object.assign({}, commonParams, {
    start,
    count
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

// 即将热映
export function getMovieSoon(start, count) {
  const url = '/v2/movie/coming_soon'
  const data = Object.assign({}, commonParams, {
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
