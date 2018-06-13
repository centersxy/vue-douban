<template>
  <div class="rank-wrapper">
    <div class="fixed-title">
      <span class="back" @click="back">
        <i class="icon-back"></i>
      </span>
      <span class="type">
        <span>{{}}</span>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .rank-wrapper
  // 防止底部tab栏目遮挡
    position: relative
    z-index: 10
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
        padding-left: 60px
        color: $color-text-f
    .switches
      position: fixed
      top: 50px
      width: 100%
      height: 40px
      z-index: 200
      background-color: $color-background
    .rank-list-wrapper
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: $color-background
      .rank-content
        padding: 50px 15px 40px 15px
        &.more-padding
          padding-top: 90px

</style>

