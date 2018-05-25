<template>
  <div class="suggest-wrapper">
    <div class="to-top" @click="toTop" v-if="result.length">
      <span>返回顶部</span>
    </div>
    <scroll class="suggest"
            :data="result"
            :pullup="pullup"
            @scrollToEnd="searchMore"
            ref="suggest">
      <ul class="suggest-list">
        <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
          <div class="item-pic">
            <img v-lazy="replaceUrl(item.image)" width="50" height="70">
          </div>
          <div class="item-info">
            <div class="title">{{item.title}}</div>
            <div class="info">
              <span class="rating">{{filterRating(item.rating)}}</span>
              <span class="genres">{{item.genres}}</span>
              <span class="pubdate">{{filterDateTime(item.pubdates)}}</span>
            </div>
          </div>
        </li>
        <load-more :hasMore="hasMore" v-if="result.length"></load-more>
      </ul>
      <div class="no-result" v-if="noResult">抱歉，暂无搜索结果 :(</div>
      <load-more :fullShow="fullShow" v-if="!result.length && !noResult"></load-more>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {tagSearch, movieSearch} from 'api/movie-search'
  import {creatSearchList} from 'common/js/movies'
  import Scroll from 'base/scroll/scroll'
  import LoadMore from 'base/loadMore/loadMore'
  import {mapMutations} from 'vuex'
  const SCROLL_MORE = 20
  
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      tagSearch: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        result: [],
        Search: null, // 关键字||标签
        searchIndex: 0,
        pullup: true,
        loadMoreFlag: true,
        fullShow: true,
        hasMore: true,
        noResult: false   // 暂无搜素结果显示
      }
    },
    created() {
      this._searchType()
    },
    methods: {
      toTop() {
        this.$refs.suggest.scrollTo(0, 0, 200);
      },
      selectItem(item) {
        // 点击搜索结果跳转
        this.$router.push({
          path: `/movie/${item.id}`
        });
        this.setMovie(item);
        // 传递选中搜索的关键词
        this.$emit('select', item)
      },
      search() {
        this.searchIndex = 0
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        this.Search(this.query, this.searchIndex, SCROLL_MORE).then((res) => {
//          const queryRet = res.title.split('"');
//          if (this.query !== queryRet[1]) { // 防止由于加载缓慢，之前废弃的数据篡改当前数据
//            console.log('old request + 1', queryRet[1]);
//            return; // 舍弃过时的请求
//          }
          // 无结果时
          if (!res.subjects.length) {
            this.noResult = true
          } else {
            this.noResult = false
          }
          this.result = creatSearchList(res.subjects)
          this.checkMore(res)
        })
      },
      searchMore() { // 加载更多
        if (!this.loadMoreFlg) { //上一次还未加载完成忽略
          return
        }
        this.loadMoreFlg = false
        if (!this.hasMore) {
          return
        }
        this.searchIndex += SCROLL_MORE
        this.Search(this.query, this.searchIndex, SCROLL_MORE).then((res) => {
//          this.result = [...this.result, ...creatSearchList(res.subjects)]
          this.result = this.result.concat(creatSearchList(res.subjects))
          this.checkMore(res)
          this.loadMoreFlg = true
        })
      },
      checkMore(data) { // 检查更多
        const movies = data.subjects
        if (!movies.length || (data.start + data.count) > data.total)  {
          this.hasMore = false
        }
      },
      _searchType() {// 判断搜索的类型
        this.Search = this.tagSearch ? tagSearch : movieSearch
      },
      // 处理图片403
      replaceUrl(srcUrl) {
        if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
        }
      },
      filterRating(rating) {  // 处理评分
        if (rating === 0) {
          return '暂无评分'
        }else {
          return rating  + '分'
        }
      },
      filterDateTime(date) { // 处理上映时间
        let ret = ''
        date.forEach((item) => {
          let index = item.indexOf('中国大陆')
          if (index>0) {
            ret = item
          } else {
            ret = item
          }
        })
        if (!ret) {
          return '尚未追溯'
        }
        return ret
      },
      ...mapMutations({
        setMovie: 'SET_MOVIE'
      })
    },
    watch: {
      query(newquery) {
        this._searchType();
        this.search(newquery)
      }
    },
    components: {
      Scroll,
      LoadMore
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  .suggest-wrapper
    height: 100%
    .to-top
      box-sizing: border-box
      height: 22px
      position: fixed
      right: 0
      top: 80%
      z-index: 800
      padding: 5px
      background: $color-theme-f
      color: $color-background
      text-align: center
      font-size: $font-size-small
    .suggest
      height: 100%
      overflow: hidden
      .suggest-list
        padding: 15px
        .suggest-item
          margin-top: 15px
          height: 70px
          display: flex
          &:first-child
            margin-top: 0
          .item-pic
            flex: 50px 0 0
            width: 50px
            margin-right: 10px
          .item-info
            flex: 1
            .title
              font-size: $font-size-medium
              color: $color-text-f
              margin-bottom: 10px
            .info
              font-size: 0
              display: flex
              flex-direction: column
              justify-content: space-between
              span
                font-size: $font-size-small
                flex: 1
      .no-result
        position: absolute
        top: 50%
        width: 100%
        text-align: center
</style>

