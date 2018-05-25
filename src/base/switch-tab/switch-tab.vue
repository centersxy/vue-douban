<template>
  <ul class="switches">
    <li class="switch-item"
        v-for="(item, index) in switches"
        :class="{'active': currentIndex===index}"
        @click="switchSelect(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    methods: {
      switchSelect(index) {
        this.$emit('switchItem', index)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  .switches
    position: relative
    z-index: 200
    background: $color-background
    display: flex
    align-items: center
    width: 100%
    .switch-item
      flex: 1
      text-align: center
      padding: 15px
      font-size: $font-size-medium-x
      color: $color-text
      border-bottom: 1px solid transparent
      &.small-font
        padding: 14px 5px
        font-size: $font-size-small
      &.active
        color: $color-theme-f
        border-bottom: 1px solid $color-theme-f
</style>
