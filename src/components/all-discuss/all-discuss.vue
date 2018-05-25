<template>
  <div class="discussion-wrapper">
    <div class="fixed-title">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <span class="type">{{title}}</span>
      <span class="to-top" @click="toTop">
        <i class="icon-circle-up"></i>
      </span>
    </div>
    <scroll class="all-discuss"
            ref="scroll"
            :data="discussList"
            :pullup="pullup"
            @scrollToEnd="loadMore"
    >
      <div class="discuss-content">
        <movie-comment
          v-if="discussType==='comments'"
          :comments="discussList"
          :commentNum="discussNum"
          :isShow="isShow"
          :hasMore="hasMore"
        >
        </movie-comment>
        <movie-review
          v-else
          :reviews="discussList"
          :reviewNum="discussNum"
          :isShow="isShow"
          :hasMore="hasMore"
        >
        </movie-review>
      </div>
      <load-more :fullShow="fullShow" v-if="!discussList.length && !noResult"></load-more>
      <div class="no-result" v-if="noResult">这里什么都没有呃 :(</div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import MovieComment from 'components/movie-comment/movie-comment'
  import MovieReview from 'components/movie-review/movie-review'
  import LoadMore from 'base/loadMore/loadMore'
  import Scroll from 'base/scroll/scroll'
  import {getAllComments, getAllReviews} from 'api/movie-detail'
  import {mapGetters, mapMutations} from 'vuex'
  
  const SCROLL_MORE = 20
  export default {
    created() {
      this.isShow = true
      this.fullShow = true
      this.loadMoreFlg = true; // 控制滚动加载速度
      this._getDiscussList()
    },
    computed: {
      title() {
        return `${this.movie.title}的全部${this.type}`
      },
      type() {
        return this.discussType === 'comments' ? '短评' : '影评'
      },
      ...mapGetters([
        'movie',
        'discussType'
      ])
    },
    data() {
      return {
        discussIndex: 0,
        discussList: [],
        discussNum: 0,
        pullup: true, // 支持滚动加载
        hasMore: true, // 存在更多数据
        noResult: false
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      toTop() { // 返回顶部
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      loadMore() {
        if (!this.loadMoreFlg || !this.hasMore) { // 上一次加载还未完成或没有更多数据时候，忽略此次事件
          //console.log('please wait...');
          return;
        }
        this.loadMoreFlg = false
        this.discussIndex += SCROLL_MORE
        this.getData(this.movie.id, this.discussIndex, SCROLL_MORE).then((res) => {
          this.discussList = this.discussList.concat(res[this.isType])
          this._checkMore(res)
          this.loadMoreFlg = true
        })
      },
      _checkMore(data) { // 检查是否存在更多数据
        const discussions = data.comments ? data.comments : data.reviews
        if (!discussions.length || data.start + data.count > data.total) {
          this.hasMore = false
        }
      },
      _getDiscussList() {
        if (!this.discussType) {
          this.$router.push('/home')
          return
        }
        let isComments = this.discussType === 'comments'  //标记
        this.isType = isComments ? 'comments' : 'reviews' //类型
        this.getData = isComments ? getAllComments : getAllReviews //判断请求
        
        this.getData(this.movie.id, this.discussIndex, SCROLL_MORE).then((res) => {
          this.discussList = res[this.isType]
          this.noResult = this.discussList.length ? this.noResult : true; // 是否存在结果
          this.discussNum = res.total
          this._checkMore(res); // 检查是否还存在更多数据
        })
      }
    },
    components: {
      MovieComment,
      MovieReview,
      LoadMore,
      Scroll
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .discussion-wrapper
    height: 100%
    .fixed-title
      border-bottom-1px($color-line)
      position: fixed
      top: 0
      width: 100%
      height: 50px
      z-index: 200
      background-color: $color-background
      .back
        position: absolute
        top: 0px
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 15px
          font-size: $font-size-large
          color: $color-theme-f
      .type
        line-height: 50px
        font-size: $font-size-medium-x
        padding-left: 50px
      .to-top
        position: absolute
        top: 0
        right: 6px
        z-index: 50
        .icon-circle-up
          display: block
          padding: 15px
          font-size: $font-size-large-x
          color: $color-theme-f
    .all-discuss
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: 150
      overflow: hidden
      background-color: $color-background
      .discuss-content
        padding-top: 50px
      .no-result
        position: absolute
        top: 50%
        width: 100%
        text-align: center
</style>

