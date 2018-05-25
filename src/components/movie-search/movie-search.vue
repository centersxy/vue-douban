<template>
  <transition name="slide-fade">
    <div class="search">
      <search-box
        @query="onChangeQuery"
        :tagSearch="tagSearch"
        ref="searchBox"
      >
      </search-box>
      <!-- title -->
      <div class="fixed-title" v-show="tagSearch">
        <span class="back" @click="back">
          <i class="icon-back"></i>
        </span>
        <span class="type">
          <span>关于{{query}}的电影</span>
        </span>
      </div>
      <!-- tag -->
      <div class="shortcut-wrapper">
        <scroll class="shortcut"
                :beforeScroll="beforeScroll"
                @beforeScroll="listenScroll"
                :data="searchHistory"
                ref="shortcut">
          <div>
            <div class="tag-list">
              <div class="douban-tag tag">
                <span v-for="item in doubanTag" class="tag-item" @click="tagQuery(item)">{{item}}</span>
              </div>
              <div class="movie-tag tag">
                <span v-for="item in movieTag" class="tag-item" @click="tagQuery(item)">{{item}}</span>
              </div>
              <div class="country-tag tag">
                <span v-for="item in countryTag" class="tag-item" @click="tagQuery(item)">{{item}}</span>
              </div>
              <!-- 历史 -->
              <div class="search-history" v-show="searchHistory.length">
                <h1 class="title">
                  <span class="text">搜索历史</span>
                  <span class="clear" @click="showConfirm">
                    <i class="icon-bin"></i>
                  </span>
                </h1>
                <history-list :searches="searchHistory" @delSearch="deleteHistory"></history-list>
              </div>
            </div>
          </div>
        </scroll>
      </div>
      <!-- 搜索列表 -->
      <div class="search-result" v-show="query" ref="searchResult">
        <suggest :query="query" :tagSearch="tagSearch" @listScroll="blurInput" @select="saveSearch"  ref="suggest"></suggest>
      </div>
      <confirm @cancel="clearSearchHistory"
               text="是否清空所有搜索历史"
               ref="confirm"></confirm>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import Scroll from 'base/scroll/scroll'
  import Suggest from 'components/suggest/suggest'
  import HistoryList from 'base/history-list/history-list'
  import Confirm from 'base/confirm/confirm'
  import { mapActions, mapGetters } from 'vuex';
  export default{
    name: 'search',
    data() {
      return {
        doubanTag: ['经典', '豆瓣高分', '冷门佳片'],
        movieTag: ['剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '治愈', '青春', '文艺'],
        countryTag: ['日本', '韩国'],
        query: '',
        tagSearch: false,
        beforeScroll: true
      }
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    mounted() {
      this.$nextTick(() => {
        this.focusInput();
      });
    },
    methods: {
      back() {
        // 1. 清空搜索框
        // 2. 隐藏title
        this.tagSearch = false
        this.query = ''
      },
      listenScroll() {
        this.blurInput()
      },
      onChangeQuery(query) {
        this.query = query
      },
      tagQuery(query) {
        this.tagSearch = true
        this.query = query
//        this.$refs.searchBox.setQuery()
      },
      blurInput() {
        this.$refs.searchBox.blur();
      },
      focusInput() {
        this.$refs.searchBox.focus();
      },
      saveSearch() {
        this.saveSearchHistory(this.query)
      },
      deleteHistory(item) {
        this.delSearchHistory(item)
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      // All del
      clearSearchHistory() {
        this.cleanSearchHistory()
        this.$refs.confirm.hide()
      },
      ...mapActions([
        'saveSearchHistory',
        'delSearchHistory',
        'cleanSearchHistory'
      ])
    },
    components: {
      SearchBox,
      Scroll,
      Suggest,
      HistoryList,
      Confirm
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .search
    position: fixed
    z-index: 500
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
    &.slide-fade-enter-active,.slide-fade-leave-active
      transition: opacity .3s
    &.slide-fade-enter,.slide-fade-leave-to
      opacity: 0
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
    .shortcut-wrapper
      position: fixed
      top: 50px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .tag-list
          padding: 0 15px
          width: 90%
          .tag
            border-bottom-1px($color-line)
            padding: 20px 0
            &:last-child
              border-bottom-1px($color-theme-f)
            &.movie-tag
              .tag-item
                margin-bottom: 15px
            .tag-item
              display: inline-block
              margin-right: 15px
              padding: 8px 16px
              font-size: $font-size-medium
              color: $color-theme-f
              border: 1px solid $color-theme-f
              border-radius: 10px
        .search-history
          position: relative
          margin: 20px 20px 0 20px
          .title
            display: flex
            align-items: top
            height: 40px
            font-size: $font-size-large
            color: $color-theme-f
            .text
              flex: 1
            .clear
              extend-click()
              .icon-bin
                font-size: $font-size-large
                color: $color-theme-f
    .search-result
      position: fixed
      width: 100%
      top: 50px
      bottom: 0
      background: $color-background
</style>
