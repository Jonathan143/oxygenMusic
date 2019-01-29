<template>
  <div class="hot-container">
    <h2 class="title">{{title}}</h2>
    <div class="tags">
      <md-tag
        size="large"
        shape="circle"
        font-color="#666"
        type="ghost"
        v-for="(tag, idx) in tags"
        :key="idx"
        @click.native="onClickTag(tag.name)"
      >{{tag.name}} <i class="iconfont icon-hot" v-if="tag.hot"></i></md-tag>
    </div>
  </div>
</template>

<script>
import { Tag } from "mand-mobile";
export default {
  props: {
    title: String,
    tags: Array,
    deleicon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "md-tag": Tag
  },
  methods: {
    onClickTag(tag) {
      this.$emit('click-tag',tag)
    }
  }
};
</script>

<style lang="stylus" scoped>
.hot-container
  padding 0 20px 20px
  .title
    margin-top 28px
    font-size 28px
    font-weight 600
  .tags
    display flex
    flex-wrap wrap
    >>>.md-tag
      margin 20px 20px 0 0
      position relative
      .default
        padding 12px 50px !important
        border-color #928ffa !important
    .icon-hot
      position absolute
      color red
      font-size 36px
      right 8px
      top 0
</style>