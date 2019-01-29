<template>
  <div class="topbg-container" :style="{ backgroundImage: `url(${info .picUrl})` }">
    <div class="content">
      <p class="name">{{info.name}} {{alias}}</p>
      <div class="al-ar">
        <p class="ar">单曲：{{info.musicSize}}</p>
        <p class="al">专辑：{{info.albumSize}}</p>
      </div>
      <p class="info">{{info.briefDesc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['artinfo'],
  data() {
    return {
      info: {},
      alias: '',
    }
  },
  watch: {
    artinfo(newV) {
      this.info = newV;
      if(newV.alias != '') {
        this.alias = `(${newV.alias})`;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.topbg-container
  font-size 24px
  width 100%
  height 680px
  background-repeat no-repeat
  background-size cover
  // margin-top -100px
  display flex
  align-items flex-end
  box-sizing border-box
  .content
    width 100%
    padding 20px
    max-height 320px
    overflow-x hidden
    overflow-y scroll
    box-sizing border-box
    background-color rgba(11,15,22,.7)
    p
      color: #d4d6dd
    .name
      font-size 28px
      letter-spacing 1px
      margin 8px 0
    .al-ar
      display flex
      margin 16px 0
      .ar
        margin-right 20px
    .info
      line-height 36px
</style>