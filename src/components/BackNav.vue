<template>
  <div class="back-nav-container">
    <div class="btn" @click="back">
      <md-icon name="arrow-left" size="md" color="#fff"></md-icon>
    </div>
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
import { Icon } from "mand-mobile";
export default {
  props: ['title'],
  components: {
    "md-icon": Icon
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang=stylus scoped>
@import '~styles/varibles.styl';
.back-nav-container
  display flex
  font-size 32px
  height 80px
  box-sizing border-box
  align-items center
  background-color #928ffa
  .btn
    width 56px
    height 56px
    line-height 56px
    border-radius 50%
    text-align center
    margin-left 10px
    &:hover
      background-color rgba(0,0,0,.2)
  .title
    margin-left 20px
    color #fff
</style>