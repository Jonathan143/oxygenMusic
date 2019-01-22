<template>
  <div class="btn-nav-container">
    <div
      v-for="(item,idx) in iconBtn"
      :key="idx"
      class="btn-nav-item"
    >
      <div class="icon-btn">
        <i
          class="iconfont"
          :class="item.icon"
        ></i>
      </div>
      <p class="btn-text">{{item.text}}</p>
    </div>
  </div>
</template>

<script>
const iconBtn = [
  {
    icon: "icon-playlist",
    text: "歌单"
  },
  {
    icon: "icon-singer",
    text: "歌手"
  },
  {
    icon: "icon-toplist2",
    text: "排行榜"
  }
];
export default {
  data() {
    return {
      iconBtn: [...iconBtn]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
.btn-nav-container
    width 100%
    height 200px
    display flex
    align-items center
    justify-content space-around
    background-color #fff
    border-bottom 1px solid $divider
    .btn-nav-item
      text-align center
      .icon-btn
        width 80px
        height 80px
        display flex
        align-items center
        justify-content center
        border-radius 50%
        background-color $themeColor
        box-shadow 0 20px 50px 0 $themeColor
        .iconfont
          font-size 48px
          color #fff
      .btn-text
        margin-top 20px
        font-size 28px
</style>