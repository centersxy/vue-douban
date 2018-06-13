<template>
  <div class="movie-comment">
    <div class="type-title" >
      短评{{commentNum}}条
    </div>
    <ul>
      <li class="comment-item" v-for="(comment, index) in comments">
        <div class="avatar">
          <img v-lazy="comment.author.avatar" width="36" height="36">
        </div>
        <div class="content">
          <h1 class="name">{{comment.author.name}}</h1>
          <p class="text">{{comment.content}}</p>
          <span class="date">{{comment.created_at}}</span>
          <div class="useful-count"
               :class="{'like': isLike(comment.id)}"
               @click="likeSign(comment.id, index)"
          >
            <i class="icon-thumb_up"></i>
            {{comment.useful_count}}
          </div>
        </div>
      </li>
    </ul>
    <div class="allComment" @click="needAllComments" v-if="!isShow">
      <span>全部短评{{commentNum}}个</span>
    </div>
    <load-more :hasMore="hasMore" v-show="comments.length" v-if="isShow"></load-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import LoadMore from 'base/loadMore/loadMore'
  import { mapActions, mapGetters } from 'vuex';
  export default{
    props: {
      comments: {
        type: Array,
        default: []
      },
      commentNum: {
        type: Number,
        default: 0
      },
      isShow: {
        type: Boolean,
        default: false
      },
      hasMore: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['likeComment'])
    },
    methods: {
      needAllComments() {
        this.$emit('needAllComment')
      },
      isLike(id) {
        const cid = this.likeComment.findIndex((item) => {
          return item === id
        })
        if (cid > -1) {
          return true
        }
        return false
      },
      likeSign(id, index) {
        // 提交
        this.saveLikeHistory(id)
        // 模拟点赞 + -
        const cid = this.likeComment.findIndex((item) => {
          return item === id
        })
        if (cid > -1) {
          this.comments[index].useful_count ++
        } else {
          this.comments[index].useful_count --
        }
      },
      ...mapActions(['saveLikeHistory'])
    },
    components: {
      LoadMore
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  .movie-comment
    padding: 20px
    background: $color-background
    .type-title
      font-size: $font-size-medium
      margin-bottom: 15px
    .comment-item
      display: flex
      margin-bottom: 20px
      .avatar
        flex: 0 0 36px
        width: 36px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        flex: 1
        position: relative
        font-size: $font-size-medium
        color: $color-text-f
        .name
          display: inline-block
          line-height: 25px
          margin-right: 5px
        .star
          display: inline-block
        .text
          line-height: 20px
        .date
          font-size: $font-size-small
          color: $color-text
          line-height: 25px
        .useful-count
          position: absolute
          color: $color-text
          top: 5px
          right: 5px
          &.like
            color: $color-theme-f
    .allComment
      font-size: $font-size-medium
      color: $color-theme-f
      text-align: center
      padding-bottom: 10px
</style>
