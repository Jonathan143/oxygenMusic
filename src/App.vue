<template>
  <div id="app">
    <transition name="loading-transition" leave-active-class="animated zoomOut">
      <div class="loading-container" v-show="isLoading">
        <md-activity-indicator
          type="carousel"
          :size="36"
          :text-size="36"
          color="#9025fc"
          text-color="#9025fc"
          vertical
          >Music loading</md-activity-indicator
        >
      </div>
    </transition>
    <top-nav v-show="isTopNavShow"></top-nav>
    <div class="router-view">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <transition name="loading-transition" enter-active-class="animated zoomIn">
      <div class="bottom-player" v-show="isPlayerShow">
        <player></player>
      </div>
    </transition>
    <div v-show="isPlayerShow" class="player-zw"></div>
  </div>
</template>

<script>
import player from "./components/player";
import TopNav from "./components/topNav";
import { ActivityIndicator } from "mand-mobile";
import { mapState } from "vuex";
export default {
  components: {
    player,
    TopNav,
    "md-activity-indicator": ActivityIndicator
  },
  computed: {
    ...mapState([`isPlayerShow`, `isLoading`]),
    isTopNavShow() {
      let name = this.$route.name;
      const pathName = [`home`, `personal`, `find`];
      if (pathName.includes(name)) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    // 网易云userID  259801485
    // this.axios(`/user/detail?uid=259801485`)
    //   .then(res=>{
    //     console.log(res.data);
    //   })
  },
  beforeDestroy() {
    sessionStorage.clear();
  }
};
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

#app {
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fcfcfc;
  }

  .bottom-player {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    font-size: 28px;
    background-color: #b gColor;
  }

  .player-zw {
    height: 100px;
    background-color: #b gColor;
  }
}
</style>
