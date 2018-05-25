<template>
  <div class="movie-info">
    <div class="overall">
      <div class="desc">
        <h2 class="title">{{movieDetail.title}}</h2>
        <span class="tags">{{tags}}</span>
        <span class="original-title">原名： {{movieDetail.original_title}}</span>
        <span class="pubdate">上映时间：{{pubdate}}</span>
        <span class="duration">片长：{{durations}}</span>
      </div>
      <div class="rank">
        <span class="origin">豆瓣评分</span>
        <span class="rating">{{normalizeScore()}}</span>
        <span class="num">{{movieDetail.ratings_count}}人</span>
      </div>
    </div>
    <div class="operate">
      <div class="want-watch"
           :class="{'wanted': isWantedMovie(movieDetail.id)}"
           @click="wantMovie"
           v-text="wantText"></div>
      <div class="has-watched"
           :class="{watched: isWatchMovie(movieDetail.id)}"
           v-text="watchText"
           @click="watchMovie">看过</div>
    </div>
    <div class="summary">
      <h2 class="title">剧情简介</h2>
      <p class="content">{{movieDetail.summary}}</p>
    </div>
    <scroll class="casts" :scrollX="this.scrollX" ref="scroll">
      <div class="casts-content" ref="content">
        <h2 class="title">影人</h2>
        <div class="cast-item" v-for="item in allCasts()">
          <img v-lazy="replaceUrl(item.avatars.large)" width="90" height="120">
          <h3 class="item-title">{{item.name}}</h3>
          <span v-if="item.isDirector">导演</span>
        </div>
        <div class="no-result" v-if="!allCasts().length">
          暂无信息
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'
  import {findDateTime} from 'common/js/movies'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    props: {
      movieDetail: {
        type: Object,
        default: {}
      }
    },
    computed: {
      tags() { // 标签
        let year = this.movieDetail.year
        let tags = this.movieDetail.genres.join('/')
        return `${year}/${tags}`
      },
      durations() { //时长
        return this.movieDetail.durations[0]
      },
      pubdate() { //上映时间
        let ret = '';
        const key = '中国大陆'
        this.movieDetail.pubdates.forEach((item) => {
          let index = item.indexOf(key)
          if (index > 0) { // 检索的字符串值没有出现，则该方法返回 -1。
            ret = item
          }
        })
        return ret
      },
      ...mapGetters([
        'movie',
        'wantMovies',
        'watchMovies'
      ])
    },
    mounted() {
      this.$nextTick(() => {
        this.initPicWidth()
        this.$refs.scroll.refresh()
      })
    },
    data() {
      return {
        scrollX: true,
        wantText: '想看',
        watchText: '看过 ☆☆☆☆☆'
      }
    },
    methods: {
      normalizeScore() { // 评分
        let SCORE_LENGTH = this.movieDetail.rating.average.toString().length
        if (SCORE_LENGTH < 2) {
          return `${this.movieDetail.rating.average}.0`
        }
        return this.movieDetail.rating.average
      },
      allCasts() { // 获取导演和演员的分组
        let removeIndex = []
        this.movieDetail.directors.forEach((item, index) => {
          item.isDirector = true
          if (item.avatars === null) { // 有的导演不存在照片
            removeIndex.push(index)
          }
        });
        for (let i = removeIndex.length; i > 0; i--) { // 移除信息不完全的导演
          this.movieDetail.directors.splice(removeIndex[i - 1], 1);
        }
        removeIndex = []; // 重置移除清单
        this.movieDetail.casts.forEach((item, index) => {
          // console.log(index)
          if (item.avatars === null) { // 有的演员不存在照片
            removeIndex.push(index)
          }
        })
        for (let i = removeIndex.length; i > 0; i--) { // 移除信息不完全的演员
          this.movieDetail.casts.splice(removeIndex[i - 1], 1)
        }
        return this.movieDetail.directors.concat(this.movieDetail.casts)
      },
      // 收藏电影
      wantMovie() {
        this.saveWantHistory(this.movie)
        const index = this.wantMovies.findIndex((item) => {
          return item.id === this.movie.id
        })
        if (index > -1) {
          this.wantText = '❤ 收藏'
        } else {
          this.wantText = '想看'
        }
      },
      // 首次进入读取缓存 查看是否已经收藏
      isWantedMovie(id) {
        const index = this.wantMovies.findIndex((item) => {
          return item.id === id
        })
        if (index > -1) { // 已经存在
          this.wantText = '❤ 收藏'
          return true
        }
        return false
      },
      // 看过电影
      watchMovie() {
        this.saveWatchHistory(this.movie)
        const index = this.watchMovies.findIndex((item) => {
          return item.id === this.movie.id
        })
        console.log(index)
        if (index > -1) { //不存在
          this.watchText = '已看过'
        } else {
          this.watchText = '看过 ☆☆☆☆☆'
        }
      },
      isWatchMovie(id) {
        const index = this.watchMovies.findIndex((item) => {
          return item.id === id
        })
        
        if (index > -1) {
          this.watchText = '已看过'
          return true
        }
        return false
      },
      initPicWidth() { // 计算影人盒子
        let picWidth = 90
        let margin = 8
        let len = this.allCasts().length
        let width = (picWidth + margin) * len - margin
        this.$refs.content.style.width = width + 'px'
      },
      replaceUrl(srcUrl) { // 图片防盗链处理
        if (srcUrl !== undefined) {
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      },
      ...mapActions([
        'saveWantHistory',
        'saveWatchHistory'
      ])
    },
    components: {
      scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .movie-info
    background-color: $color-background
    padding: 0 20px
    .overall
      display: flex
      height: 140px
      justify-content: space-between
      .desc
        flex: 70% 0 0
        overflow: hidden
        display: flex
        flex-direction: column
        justify-content: space-around
        .original-title
          font-size: 12px
        .title
          font-size: $font-size-large
          color: $color-text-f
          padding: 10px 0 5px 0
        span
          font-size: $font-size-small
      .rank
        height: 70px
        margin-top: 15px
        padding: 10px 15px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: space-between
        box-shadow: 0px 0px 5px #ccc
        background-color: #f8f8f8
        span
          font-size: $font-size-small
          color: $color-text
          &.rating
            font-size: $font-size-large
            color: $color-text-f
    .summary
      margin-top: 20px
      padding-top: 20px
      border-top-1px(#ccc)
      .title
        font-size: $font-size-small
      .content
        padding-top: 10px
        font-size: $font-size-medium
        color: $color-text-f
        line-height: 25px
    .operate
      margin-top: 20px
      line-height: 35px
      height: 35px
      display: flex
      text-align: center
      font-size: $font-size-medium
      color: $color-theme-f
      .want-watch
        flex: 1
        border: 1px solid $color-theme-f
        border-radius: 5px
        margin-right: 20px
        &.wanted
          border: 1px solid $color-collect
          color: $color-collect
      .has-watched
        flex: 2
        border: 1px solid $color-theme-f
        border-radius: 5px
        &.watched
          border: 1px solid $color-collect
          color: $color-collect
          img
            display: inline-block
            vertical-align: middle
            padding-bottom: 2px
            border-radius: 50%
    .casts
      padding: 30px 0
      width: 100%
      white-space: nowrap
      overflow: hidden
      font-size: 0
      border-bottom-1px($color-line)
      .casts-content
        .title
          font-size: $font-size-small
          padding-bottom: 20px
        .cast-item
          width: 90px
          vertical-align: top
          display: inline-block
          text-align: center
          margin-right: 8px
          font-size: $font-size-small
          img
            height: 120px
            width: 90px
          .item-title
            color: $color-text-f
            padding: 8px 0 5px 0
            no-wrap()
        .no-result
          text-align: center
          font-size: $font-size-small
          font-size: $color-theme-f
</style>


