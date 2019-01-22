<template>
  <div id="app">
    <div class="router-view">
      <keep-alive>
        <router-view v-if="$route.meta.KeepAlive"/>
      </keep-alive>
        <router-view v-if="!$route.meta.KeepAlive"/>
    </div>
    <div class="bottom-player" v-show="isPlayerShow">
      <player></player>
    </div>
  </div>
</template>

<script>
import Player from "./components/Player";
import { mapState } from "vuex";
export default {
  components: {
    Player
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['isPlayerShow'])
  }
};
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'

#app
  height 100%
  background-color $bgColor
  display flex
  flex-direction column
  .router-view
    flex 1
    overflow auto
  .bottom-player
    font-size 28px
    background-color #fff
</style>
