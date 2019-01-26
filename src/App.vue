<template>
  <div id="app">
    <transition
      name="loading-transition"
      leave-active-class="animated zoomOut"
    >
      <div
        class="loading-container"
        v-show="isLoading"
      >
        <md-activity-indicator
          type="carousel"
          :size="36"
          :text-size="36"
          color="#9025fc"
          text-color="#9025fc"
          vertical
        >Music loading</md-activity-indicator>
      </div>
    </transition>
    <div class="router-view">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <transition
      name="loading-transition"
      enter-active-class="animated zoomIn"
    >
      <div
        class="bottom-player"
        v-show="isPlayerShow"
      >
        <player></player>
      </div>
    </transition>
  </div>
</template>

<script>
import Player from "./components/Player";
import { ActivityIndicator } from "mand-mobile";
import { mapState } from "vuex";
export default {
  components: {
    Player,
    "md-activity-indicator": ActivityIndicator
  },
  computed: {
    ...mapState(["isPlayerShow", "isLoading"])
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
  .loading-container
    display flex
    align-items center
    justify-content center
    position absolute
    width 100%
    height 100%
    z-index 999
    background-color #fff
  .bottom-player
    font-size 28px
    background-color #fff
</style>
