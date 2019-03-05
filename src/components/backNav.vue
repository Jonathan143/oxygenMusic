<template>
  <div class="back-nav-container">
    <div class="btn" @click="back">
      <md-icon name="arrow-left" size="md" color="#fff"></md-icon>
    </div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
import { Icon } from "mand-mobile";
export default {
  props: ["title"],
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

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.back-nav-container {
  display: flex;
  font-size: 30px;
  height: 100px;
  box-sizing: border-box;
  align-items: center;
  background-color: #928ffa;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

  .btn {
    width: 56px;
    height: 56px;
    line-height: 56px;
    border-radius: 50%;
    text-align: center;
    margin: 0 10px;
    background-color: $themeColor;
  }

  .title {
    max-width: 660px;
    font-size: 26px;
    color: #fff;
    ellipsis();
  }
}
</style>
