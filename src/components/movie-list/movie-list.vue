<template>
  <div class="movie-list">
    <ul>
      <li v-for="(movie, index) in Movies" @click="selectMovie(movie)">
        <div class="date" v-if="needDate && !dateFilter(index)">{{movie.date}}</div>
        <div class="item">
          <div class="info-img">
            <img v-lazy="replaceUrl(movie.image)" width="80" height="120">
          </div>
          <div class="info-desc">
            <p class="title">{{movie.title}}</p>
            <div class="director">导演：{{movie.director}}</div>
            <div class="casts">主演：{{movie.casts}}</div>
            <div class="hasWatched">{{movie.collectCount}}人看过</div>
          </div>
        </div>
      </li>
    </ul>
    <load-more :hasMore="hasMore" v-show="Movies.length"></load-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import loadMore from 'base/loadMore/loadMore'
  export default{
    components: {
      loadMore
    },
    props: {
      Movies: {
        type: Array,
        default: []
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      needDate: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      selectMovie(movie) {
        this.$emit('select', movie)
      },
      dateFilter(index) {// 确定相邻两部电影日期是否一样，划分日期分组
        if (index === 0) {
          return false
        }
        return this.Movies[index].date === this.Movies[index - 1].date
      },
      // 处理图片403
      replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .movie-list
    ul
      .date
        width: 100%
        background-color: $color-background-d
        padding-left: 5px
        height: 30px
        line-height: 30px
      .item
        display: flex
        align-items: center
        box-sizing: border-box
        padding: 15px 0
        .info-img
          flex: 80px 0 0
          margin-right: 10px
        .info-desc
          height: 120px
          flex: 1
          display: flex
          flex-direction: column
          justify-content: space-around
          overflow: hidden
          .title
            font-size: $font-size-medium-x
            color: $color-text-f
          .director
            font-size: $font-size-small
          .casts
            font-size: $font-size-small
            no-wrap()
          .hasWatched
            color: $color-text-f
            font-size: $font-size-small
</style>

