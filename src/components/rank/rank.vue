<template>
  <div class="rank">
    <div class="go-search" @click="goSearch">
      <div class="logo">
        <img src="./douban-logo.png" width="35" height="35">
      </div>
      <div class="search-content">
        <span class="icon-search"></span>
        <span>电影/影人/标签</span>
      </div>
    </div>
    <div class="rank-list">
      <div>
        <div class="scroll-content">
          <h1 class="title">精选榜单</h1>
          <router-link tag="div" to="/rank/top250" class="top250 rank-item">
            <div class="desc">
              <h2 class="name">豆瓣 Top250</h2>
              <span class="brief">8分以上好电影</span>
            </div>
            <div class="rank-img">
              <!--<img v-for="(item,index) in urlList[0]" :src="replaceUrl(item)" :class="{'top': index === 1 }"/>-->
            </div>
          </router-link>
          <router-link tag="div" to="/rank/new-movie" class="new-movie rank-item">
            <div class="desc">
              <h2 class="name">新片榜</h2>
              <span class="brief"></span>
            </div>
            <div class="rank-img">
              <!--<img v-for="(item,index) in urlList[2]" :src="replaceUrl(item)" :class="{'top': index === 1 }"/>-->
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {}
    },
    methods: {
      goSearch() {
        this.$router.push('/search')
      },
      replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "../../common/stylus/variable.styl"
  .rank
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
    .rank-list
      position: fixed
      top: 50px
      left: 0
      right: 0
      bottom: 62px
      padding: 0 15px
      overflow: hidden
      .title
        color: $color-text-f
      .scroll-content
        padding: 20px 0
      .rank-item
        margin-top: 15px
        height: 130px
        border-radius: 10px
        color: $color-background
        .desc
          vertical-align: top
          display: inline-block
          box-sizing: border-box
          padding-top: 50px
          width: 40%
          height: 100%
          text-align: center
          .name
            font-size: $font-size-large
          .brief
            font-size: $font-size-small
        .rank-img
          vertical-align: top
          display: inline-block
          width: 55%
          height: 100%
          text-align: center
          img
            display: inline-block
            vertical-align: text-top
            position: relative
            top: 50%
            transform: translateY(-50%)
            width: 30%
            &.top
              width: 35%
      .top250
        background: linear-gradient(#E1A708,#EFD491)
      .weekly
        background: linear-gradient(#32C05E,#A1E5BE)
      .new-movie
        background: linear-gradient(#A361C3,#D9B9E8)
      .us-box
        background: linear-gradient(#DD7286,#F3B9C5)

</style>

