import axios from 'axios'
import {commonParams} from "./config"

// 详情
export function getMovieDetail(id) {
  const url = `/v2/movie/subject/${id}`
  const data = Object.assign({}, commonParams)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
// 短评列表
export function getAllComments(id, start, count) {
  const url = `/v2/movie/subject/${id}/comments`
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

// 影评列表
export function getAllReviews(id, start, count) {
  const url = `/v2/movie/subject/${id}/reviews`
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

// 评论详情
export function getDiscussDetail(id) {
  const url = `/v2/movie/review/${id}`
  const data = Object.assign({}, commonParams)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  });
}
