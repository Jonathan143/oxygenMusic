<template>
  <div class="artist-list-container">
    <div class="artist-item" v-for="(art,idx) in 99" :key="idx">
      <img
        class="avatar"
        src="https://imgavater.ui.cn/avatar/3/0/5/4/934503.jpg?imageMogr2/auto-orient/crop/!748x748a0a1/thumbnail/148x148"
        alt=""
      >
      <div class="right-box">
        <div class="info">
          <p class="name">木子...页</p>
          <p class="score"><i class="iconfont icon-hot-fire"></i>213134</p>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';
.iconfont
  font-size 32px
.artist-list-container
  font-size 24px
  padding 20px
  background-color #fff
  height 100%
  box-sizing border-box
  .artist-item
    display flex
    align-items flex-end
    margin-bottom 20px
    .avatar
      width 120px
      height 120px
      border-radius 50%
      z-index 1
    .right-box
      width 100%
      display flex
      align-items center
      justify-content space-between
      background-color #e8eaec
      padding 12px 4px 12px 60px
      box-sizing border-box
      margin-left -50px
      border-radius 12px
      .name
        font-size 26px
        margin-bottom 8px
      .icon-hot-fire
        color #ff3d00
        margin-right 4px
</style>