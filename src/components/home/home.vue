<template>
  <div class="movie-show">
    <div class="go-search" @click="goSearch">
      <div class="logo">
        <img src="./douban-logo.png" width="35" height="35">
      </div>
      <div class="search-content">
        <span class="icon-search"></span>
        <span>电影/影人/标签</span>
      </div>
    </div>
    <switch-tab :switches="switches" :currentIndex="currentIndex" @switchItem="switchItem"></switch-tab>
    <div class="list-wrapper">
      <scroll class="list-scroll"
              v-show="currentIndex === 0"
              :data="Movies"
              :pullup="pullup"
              @scroll="scroll"
              @scrollToEnd="loadMore"
              ref="NowMovie"
      >
        <div class="list-inner">
          <movie-list :Movies="Movies"
                      :hasMore="hasMoreNowMovie"
                      @select="selectItem"></movie-list>
        </div>
      </scroll>
      <scroll class="list-scroll"
              v-show="currentIndex === 1"
              :data="SoonMovies"
              :pullup="pullup"
              @scroll="scroll"
              @scrollToEnd="loadMore"
              ref="SoonMovie"
      >
        <div class="list-inner">
          <movie-list :Movies="SoonMovies"
                      :hasMore="hasMoreSoonMovie"
                      :needDate="needDate"
                      @select="selectItem"
          ></movie-list>
        </div>
      </scroll>
      <load-more :fullShow="fullShow"
                 v-show="currentIndex===1&&!SoonMovies.length||currentIndex===0&&!Movies.length"
      ></load-more>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import switchTab from 'base/switch-tab/switch-tab'
  import movieList from 'components/movie-list/movie-list'
  import LoadMore from 'base/loadMore/loadMore'
  import scroll from 'base/scroll/scroll'
  import {getMovie, getMovieSoon} from 'api/movie-home'
  import {creatMovieList} from 'common/js/movies'
  import {mapMutations} from 'vuex'
  
  const SCROLL_MORE = 10   // 每次请求数据的长度
  const DATE_HEIGHT = 30   // 日期栏高度
  
  export default {
    components: {
      switchTab,
      movieList,
      scroll,
      LoadMore
    },
    created() {
      this._getMovie()
      this.probeType = 3        // 实时派发事件
      this.listenScroll = true  //监听滚动
    },
    data() {
      return {
        currentIndex: 0,
        switches: [{name: '正在'}, {name: '即将'}],
        scrollY: -1,
        pullup: true,
        fullShow: true,
        hasMore: true,
        hasMoreNowMovie: true,
        hasMoreSoonMovie: true,
        loadMoreFlg: true,  //  加载更多的标志位
        scrollIndex: 0,     //  滚动初始值
        nowMovieIndex: 0,   //  正在上映的初始值
        soonMovieIndex: 0,  //  即将上映打的初始值
        Movies: [],         //  电影列表集合
        SoonMovies: [],     //  即将上映列表集合
        needDate: true      //  显示时间标志
      }
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
        if (index === 1) {
          getMovieSoon(this.scrollIndex, SCROLL_MORE).then((res) => {
            this.SoonMovies = creatMovieList(res.subjects)
            this.checkMore(res)
          })
        }
        setTimeout(() => { // scroll组件计算高度，确保正确滚动
          this.$refs.NowMovie.refresh();
          this.$refs.SoonMovie.refresh();
        }, 20);
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      loadMore() {  //  上拉加载更多正在热映
        if (!this.loadMoreFlg) {
          return
        }
        this.loadMoreFlg = false // 重置加载标志位
        if (this.currentIndex === 0) {
          if (!this.hasMoreNowMovie) { // 不存在更多电影
            this.loadMoreFlg = true
            return
          }
          this.nowMovieIndex += SCROLL_MORE
          getMovie(this.nowMovieIndex, SCROLL_MORE).then((res) => {
            this.Movies = this.Movies.concat(creatMovieList(res.subjects))
            this.checkMore(res)
            this.loadMoreFlg = true
          })
        } else {//  上拉加载更多热映
          if (!this.hasMoreSoonMovie) {
            this.loadMoreFlg = true
            return
          }
          this.soonMovieIndex += SCROLL_MORE
          getMovieSoon(this.soonMovieIndex, SCROLL_MORE).then((res) => {
            this.SoonMovies = this.Movies.concat(creatMovieList(res.subjects))
            this.checkMore(res)
            this.loadMoreFlg = true
          })
        }
      },
      checkMore(data) { //  监测是否存在更多数据
        const movies = data.subjects
        if (!movies.length || data.start + data.count > data.total) {
          if(this.currentIndex === 0) {
            this.hasMoreNowMovie = false
          } else {
            this.hasMoreSoonMovie = false
          }
          this.loadMoreFlg = true
        }
      },
      selectItem(movie) {
        this.setMovie(movie)
        this.$router.push({
          path: `/movie/${movie.id}`
        })
      },
      goSearch() {
        this.$router.push('/search')
      },
      _getMovie() {
        getMovie(this.scrollIndex, SCROLL_MORE).then((res) => {
          this.Movies = creatMovieList(res.subjects)
          this.checkMore(res)
        })
      },
      ...mapMutations({
        setMovie: 'SET_MOVIE'
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  .movie-show
    height: 100%
    .go-search
      height: 50px
      box-sizing: border-box
      padding: 10px 10px 5px 60px
      text-align: center
      .logo
        position: absolute
        left: 10px
      .search-content
        background-color: $color-background-d
        font-size: $font-size-medium-x
        line-height: 35px
        border-radius: 5px
        span
          display: inline-block
          vertical-align: middle
    .list-wrapper
      position: absolute
      top: 97px
      bottom: 61px
      width: 100%
      .list-scroll
        position: relative
        height: 100%
        overflow: hidden
        .list-inner
          /*padding: 0px 15px*/
    .list-fixed
      position: absolute
      top: 97px
      right: 15px
      left: 15px
      .fixed-title
        width: 100%
        padding-left: 5px
        height: 30px
        line-height: 30px
        background-color: $color-background-d
</style>
