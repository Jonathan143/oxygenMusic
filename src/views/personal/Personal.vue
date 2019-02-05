<template>
  <div class="personal-container">
    <div class="info">
      <div class="name-box">
        <h2 class="name">Jonathan</h2>
        <p class="indicator-text">帅的一批</p>
      </div>
      <div class="avatar">
        <img class="av-img" src="https://imgavater.ui.cn/avatar/8/9/2/9/949298.png?imageMogr2/auto-orient/crop/!1360x1360a0a0/thumbnail/148x148" alt="">
      </div>
    </div>
    <div class="list-box">
      <div class="list" v-for="i in list" :key="i.id"> 
        <div class="icon-count">
          <i class="iconfont" :class="i.icon"></i>
          <span class="count">96</span>
        </div>
        <p class="title">{{i.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  data() {
    return {
      list: [
        {title: '喜欢的音乐', icon: 'icon-plove', id: 1},
        {title: '我的电台', icon: 'icon-diantai', id: 2},
        {title: '最近播放', icon: 'icon-zuijinbofang', id: 3},
        {title: '我的收藏', icon: 'icon-wodeshoucang', id: 4},
      ]
    }
  },
  methods: {
    ...mapMutations(['closeLoading','changeTopNavCurrent'])
  },
  mounted() {
    this.closeLoading();
    this.changeTopNavCurrent('personal');
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/varibles.styl";
.personal-container
  padding 20px
  box-sizing border-box
  .info
    display flex
    justify-content space-between
    align-items center
    background-color #fff
    padding 20px
    border-radius 16px
    box-shadow 0 20px 20px 0 #eee
    box-sizing border-box
    .name-box
      .name
        font-size 46px
        font-weight 500
        color $titleColor
      .indicator-text
        color #71819B
        line-height 36px
    .avatar
      .av-img
        width 148px
        height 148px
        border-radius 50%
  .list-box
    display flex
    flex-wrap wrap
    justify-content space-between
    margin 20px
    .list
      width 320px
      height 180px
      background-color #fff
      margin 20px 0
      padding 20px 60px
      border-radius 16px
      box-shadow 0 20px 20px 0 #eee
      box-sizing border-box
      .icon-count
        height 80px
        display flex
        justify-content space-between
        align-items center
        .iconfont
          font-size 48px
          color #928ffa
        .count
          font-size 36px
          color #928ffa
      .title
        font-size 26px
        margin-top 12px
        letter-spacing 1px
</style>