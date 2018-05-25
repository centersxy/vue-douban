import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Search from 'components/movie-search/movie-search'
import MovieDetail from 'components/movie-detail/movie-detail'
import DiscussDetail from 'components/discuss-detail/discuss-detail'
import AllDiscuss from 'components/all-discuss/all-discuss'
import Rank from 'components/rank/rank'
import RankDetail from 'components/rank-detail/rank-detail'
import UserCenter from 'components/user-center/user-center'
Vue.use(Router)

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
