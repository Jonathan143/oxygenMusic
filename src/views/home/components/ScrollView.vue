<template>
  <div class="scroll-view">
    <div class="top-container">
      <h2 class="title">{{title}}</h2>
      <md-icon name="arrow-right"></md-icon>
    </div>
    <div class="scroll-view-list">
      <div
        class="scroll-view-item"
        v-for="song in musicData"
        :key="song.id "
        @click="playMusic(song)"
      >
        <img
          class="item-img"
          v-lazy="song.picUrl"
          alt=""
        >
        <p
          class="item-title"
          :class="[multi?'multi-ellipsis':'ellipsis']"
        >{{song.songName}}</p>
        <p class="item-sub-title">{{song.singer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ScrollView, Icon } from "mand-mobile";
import { mapMutations, mapState } from "vuex";
import { setMusic } from "@/untils";
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    musicData: {
      type: Array,
      required: true
    },
    multi: {
      type: Boolean,
      default: false
    },
    hasDetails: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [ScrollView.name]: ScrollView,
    [Icon.name]: Icon
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['addMusic','openLoading']),
    playMusic(song) {
      if (this.hasDetails) {
        this.$router.push({ path: '/playlistdetail', query: { id: song.id }});
        this.openLoading();
      } else {
        let playList = setMusic(song);
        this.addMusic(playList);
      }
    }
  },
  computed: {
    ...mapState(["onPlaying"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'

.scroll-view
  width 100%
  padding 20px
  background #FFF
  box-sizing border-box
  .top-container
    display flex
    justify-content space-between
    .title
      color $titleColor
      font-size 28px
      font-weight 500
  .scroll-view-list
    display flex
    flex-wrap wrap
    justify-content space-between
    .scroll-view-item
      margin-top 20px
      font-size 22px
      .item-img
        width 180px
        height 180px
        border-radius 8px
        box-shadow()
      .item-title
        width 180px
        margin-top 10px
        color $titleColor
        line-height 36px
      .item-sub-title
        ellipsis()
        width 180px
        font-size 18px
        color $subColor
.multi-ellipsis
  multiEllipsis()
.ellipsis
  ellipsis()
</style>