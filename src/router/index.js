import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = (resolve) => {import('components/home/home').then((module) => { resolve(module)})}
const Search = (resolve) => {import('components/movie-search/movie-search').then((module) => {resolve(module)})}
const MovieDetail = (resolve) => {import('components/movie-detail/movie-detail').then((module) => {resolve(module)})}
const DiscussDetail = (resolve) => {import('components/discuss-detail/discuss-detail').then((module) => {resolve(module)})}
const AllDiscuss = (resolve) => {import('components/all-discuss/all-discuss').then((module) => {resolve(module)})}
const Rank = (resolve) => {import('components/rank/rank').then((module) => {resolve(module)})}
const RankDetail = (resolve) => {import('components/rank-detail/rank-detail').then((module) => {resolve(module)})}
const UserCenter = (resolve) => {import('components/user-center/user-center').then((module) => {resolve(module)})}


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children: [
        {
          path: ':id',
          component: MovieDetail
        }
      ]
    },
    {
      path: '/movie/:movieId',
      component: MovieDetail,
      children: [
        {
          path: 'discuss/:discussId',
          component: DiscussDetail
        },
        {
          path: ':discussType',
          component: AllDiscuss
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':type',
          component: RankDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
