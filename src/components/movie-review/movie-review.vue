<template>
  <div class="movie-review">
    <div class="type-title">
      影评{{reviewNum}}条
    </div>
    <ul>
      <li v-for="review in reviews" class="review-item" @click="selectReview(review.id)">
        <div class="content">
          <h1 class="title">{{review.title}}</h1>
          <div class="user-info">
            <div class="avatar">
              <img v-lazy="review.author.avatar" alt="" width="25" height="25">
            </div>
            <span class="name">{{review.author.name}}</span>
          </div>
          <p class="desc">{{review.summary}}</p>
        </div>
      </li>
    </ul>
    <div class="allReview" @click="needAllReviews" v-if="!isShow">
      <span>全部影评{{reviewNum}}个</span>
    </div>
    <load-more :hasMore="hasMore" v-show="reviews.length" v-if="isShow"></load-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getAllDiscussList } from 'api/movie-detail'
  import LoadMore from 'base/loadMore/loadMore'
  export default{
    props: {
      reviews: {
        type: Array,
        default: []
      },
      reviewNum: {
        type: Number,
        default: 0
      },
      isShow: {
        type: Boolean,
        default: false
      },
      hasMore: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    methods: {
      selectReview(id) { //查看影评详情
        this.$emit('chooseItem', id)
      },
      needAllReviews() {  //查看全部影评
        this.$emit('needAllReview')
      }
    },
    components: {
      LoadMore
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable.styl"
  .movie-review
    padding: 20px
    background: $color-background
    .type-title
      font-size: $font-size-medium
      margin-bottom: 15px
    .review-item
      margin-bottom: 20px
      .content
        font-size: $font-size-small
        .title
          font-size: $font-size-medium-x
          color: $color-text-f
          padding: 5px 0
        .user-info
          padding: 5px 0
          .avatar
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            img
              border-radius: 50%
          .name
            display: inline-block
            vertical-align: middle
          .star
            display: inline-block
            vertical-align: middle
        .desc
          line-height: 20px
    .allReview
      font-size: $font-size-medium
      color: $color-theme-f
      text-align: center
      padding-bottom: 10px
</style>

