<template>
  <div class="user-center">
    <div class="user">
      <div class="avatar">
        <img src="./avatar.jpg" alt=""　width="60" height="60">
      </div>
      <div class="name">豆瓣用户</div>
    </div>
    <switch-tab :switches="switches" :currentIndex="currentIndex" @switchItem="switchTab"></switch-tab>
    <div class="switch-item">
      <div class="user-item">
        <div class="movie-num">{{movieLen}}部</div>
        <rank-list
          :rankItems="myselfMovie"
          :needLoading="false"
          @select="selectMovie"
        ></rank-list>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import switchTab from 'base/switch-tab/switch-tab'
  import RankList from 'components/rank-list/rank-list'
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data() {
      return {
        currentIndex: 0,
        switches: [{name: '看过'}, {name: '想看'}],
        myselfMovie: [],
        movieLen: 0
      }
    },
    computed:{
      ...mapGetters([
        'wantMovies',
        'watchMovies'
      ])
    },
    created() {
      // 初始化调用想看
      this.myselfMovie = this.wantMovies
      this.movieLen = this.wantMovies.length
    },
    methods: {
      // 选中列表
      selectMovie(movie) {
        this.$router.push({
          path: `/movie/${movie.id}`
        })
        this.setMovie(movie)
      },
      // 判断点击列表并将vuex的数据赋值给myselfMovie
      switchTab(index) {
        this.currentIndex = index
        switch (index) {
          case 0:
            this.myselfMovie = this.wantMovies
            break
          case 1:
            this.myselfMovie = this.watchMovies
            break
        }
        this.movieLen = this.myselfMovie.length
      },
      ...mapMutations({
        setMovie: 'SET_MOVIE'
      })
    },
    watch:{
      wantMovies(list) {
        if (this.currentIndex === 0) {
          this.myselfMovie = list
          this.movieLen = list.length
        }
      },
      watchMovies(list) {
        if (this.currentIndex === 1) {
          this.myselfMovie = list
          this.movieLen = list.length
        }
      }
    },
    components: {
      switchTab,
      RankList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "../../common/stylus/variable.styl"
  .user-center
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 61px
    background-color: #f8f8f8
    overflow: hidden
    .user
      box-sizing: border-box
      width: 100%
      height: 150px
      background: linear-gradient($color-theme-f, $color-theme);
      padding: 35px 50px 35px 20px
      display: flex
      align-items: center
      .avatar
        flex: 80px 0 0
        width: 80px
        img
          border-radius: 50%
      .name
        flex: 1
        color: $color-background
        font-size: $font-size-large
    .switch-item
      position: absolute
      top: 197px
      width: 100%
      bottom: 0
      overflow: hidden
      .user-item
        .movie-num
          height: 40px
          line-height: 40px
          padding: 0 20px
          font-size: $font-size-medium
        .rank-list
          background: $color-background
          
</style>

