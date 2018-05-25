<template>
  <div class="user-center">
    <div class="user">
      <div class="avatar">
        <img src="./avatar.jpg" alt=""　width="60" height="60">
      </div>
      <div class="name">豆瓣用户</div>
    </div>
    <switch-tab :switches="switches" :currentIndex="currentIndex" @switchItem="switchTab"></switch-tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import switchTab from 'base/switch-tab/switch-tab'
  export default{
    data() {
      return {
        currentIndex: 0,
        switches: [{name: '看过'}, {name: '想看'}]
      }
    },
    methods: {
      switchTab() {},
    },
    components: {
      switchTab
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
        .develop
          text-align: center
          color: $color-theme-f

</style>

