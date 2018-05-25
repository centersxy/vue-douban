<template>
  <div class="detail-wrapper">
    <div class="fixed-title">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <span class="type" ref="fixed">
        <span class="icon" v-show="!changeFix">
          <i class="icon-video-camera"></i>
          电影
        </span>
        <span class="movie-name" v-text="movieDetail.title" v-show="changeFix"></span>
      </span>
    </div>
    <scroll class="movie-detail"
            :data="movieDetail"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scroll"
            ref="scroll">
      <div class="scroll-wrapper">
        <div class="scroll-content" v-if="movieDetail.images">
          <div class="bg-image" ref="image">
            <img v-lazy="replaceUrl(movieDetail.images.large)"/>
          </div>
          <movie-info :movieDetail="movieDetail"></movie-info>
          <div class="switch">
            <switch-tab :switches="switches" :currentIndex="currentIndex" @switchItem="switchItem"></switch-tab>
          </div>
          <movie-comment v-show="currentIndex === 0"
                         :comments="movieDetail.popular_comments"
                         :commentNum="movieDetail.comments_count"
                         @needAllComment="needAllComment"
          ></movie-comment>
          <movie-review v-show="currentIndex === 1"
                        :reviews="movieDetail.popular_reviews.slice(0, 5)"
                        :reviewNum="movieDetail.reviews_count"
                        @chooseItem="chooseItem"
                        @needAllReview="needAllReview"
          ></movie-review>
        </div>
      </div>
      <load-more :fullShow="fullShow" v-show="!movieDetail.images"></load-more>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMovieDetail} from 'api/movie-detail'
  import {mapGetters, mapMutations} from 'vuex'
  import movieInfo from 'components/movie-info/movie-info'
  import scroll from 'base/scroll/scroll'
  import loadMore from 'base/loadMore/loadMore'
  import switchTab from 'base/switch-tab/switch-tab'
  import MovieComment from 'components/movie-comment/movie-comment'
  import MovieReview from 'components/movie-review/movie-review'
  
  export default {
    name: 'movieDetail', // 创建name属性用于keep-alive组件定位本组件防止缓存
    created() {
      this.probeType = 3 // scroll组件需要实施派发scroll事件，且支持swipe
      this.listenScroll = true // scroll组件监听scroll事件并派发滚动位置
      this._getDetail()
    },
    computed: {
      ...mapGetters([
        'movie'
      ])
    },
    data() {
      return {
        fullShow: true,
        movieDetail: {},
        scrollY: -1,
        imgHeight: -1,
        changeFix: false, // fix栏目图标的显示隐藏
        switches: [{name: '短评'}, {name: '影评'}],
        currentIndex: 0
      }
    },
    methods: {
      // 处理图片403
      replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      },
      scroll(pos) { // 获取滚动距离-改变fixed栏文字
        this.scrollY = pos.y
        if (-this.imgHeight > pos.y && this.imgHeight !== -1) {
          this.changeFix = false
        } else {
          this.changeFix = true
        }
      },
      back() {
        this.$router.back()
      },
      switchItem(index) { //  切换评论
        this.currentIndex = index
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      },
      chooseItem(id) {  //  评论详情
        this.setReview(id)  // 提交影评的id
        this.$router.push({
          path: `/movie/${this.movieDetail.id}/discuss/${id}`
        })
      },
      needAllComment() {  //进入短评
        this.setDiscussType('comments')
        this.$router.push({
          path: `/movie/${this.movieDetail.id}/comments`
        })
      },
      needAllReview() {  //进入影评列表
        this.setDiscussType('reviews')  //提交评论的类型
        this.$router.push({
          path: `/movie/${this.movieDetail.id}/reviews`
        })
      },
      _getDetail() {
        if (!this.movie.id) { // 在当前界面刷新回退到主界面
          this.$router.push('/home')
          return
        }
        getMovieDetail(this.movie.id).then((res) => { // 获取电影详细
          if (!this.$route.params.movieId) { // 防止快速切换报错
            return
          }
          this.movieDetail = res
          let me = this
        })
      },
      _getImageHeight() {
        return this.$refs.Image.clientHeight
      },
      ...mapMutations({
        setReview: 'SET_REVIEW_ID',
        setDiscussType: 'SET_DISCUSS_TYPE'
      })
    },
    components: {
      movieInfo,
      scroll,
      loadMore,
      switchTab,
      MovieComment,
      MovieReview
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .detail-wrapper
    position: relative
    z-index: 10
    .fixed-title
      position: fixed
      top: 0
      width: 100%
      height: 40px
      z-index: 100
      background-color: rgba(85, 85, 85, .6)
      text-align: center
      .back
        position: absolute
        top: 0px
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 10px
          font-size: $font-size-large
          color: $color-background
      .type
        .icon
          position: absolute
          left: 50%
          top: 0
          color: $color-background
          display: block
          padding: 10px
          transform: translateX(-50%)
          .icon-video-camera
            display: inline-block
            vertical-align: text-bottom
            font-size: $font-size-large-x
        .movie-name
          display: block
          padding-top: 11px
          width: 100%
          color: $color-background
    .movie-detail
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: $color-background-f
      .bg-image
        text-align: center
        padding: 50px 0 20px 0
        background-color: $color-background-f
        img
          width: 50%
      .switch
        padding: 0 20px
        background-color: $color-background
        padding-top: 20px
</style>
