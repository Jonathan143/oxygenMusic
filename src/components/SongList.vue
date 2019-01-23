<template>
  <div class="song-list">
    <md-field class="field">
      <ul class="play-list">
        <li class="play-item top-item">
          <div
            class="play-all"
            @click="playAll"
          >
            <i class="iconfont icon-playing"></i>
            <p class="text">播放全部<span class="sub-text">{{listLength}}</span></p>
          </div>
          <div class="collection">
            <i class="iconfont icon-add"></i>
            <p class="text">收藏</p>
          </div>
        </li>
        <li
          class="play-item"
          v-for="(music,idx) in listdata"
          :key="idx"
          @click="playMusic(music)"
          :class="[playingId == music.id?'playing':'']"
        >
          <i
            class="iconfont icon-yinliang"
            v-if="playingId == music.id"
          ></i>
          <p
            class="idx"
            v-else
          >{{idx+1}}</p>
          <div class="info">
            <p class="name">{{music.songName}}</p>
            <p class="singer">{{music.singer}} - {{music.alName}}</p>
          </div>
          <i
            class="iconfont icon-btn_more"
            @click.stop="moreOperations"
          ></i>
        </li>
      </ul>
    </md-field>
    <md-popup
      v-model="isPopupShow"
      :hasMask="false"
      position="top"
    >
      <div class="popup-info">暂无后续逻辑</div>
    </md-popup>
  </div>
</template>

<script>
import { Field, Popup } from "mand-mobile";
import { mapState, mapMutations } from "vuex";
import { setMusic } from "@/untils";

export default {
  props: {
    listdata: Array
  },
  components: {
    "md-field": Field,
    "md-popup": Popup
  },
  data() {
    return {
      isPopupShow: false,
      listLength: ""
    };
  },
  computed: {
    ...mapState(["playingId"])
  },
  watch: {
    listdata() {
      this.listLength = `(共${this.listdata.length}首)`;
    }
  },
  methods: {
    ...mapMutations(["addMusic", "changePlayList"]),
    playMusic(music) {
      let playList = setMusic(music);
      this.addMusic(playList);
    },
    moreOperations() {
      this.isPopupShow = true;
      setTimeout(() => {
        this.isPopupShow = false;
      }, 2000);
    },
    playAll() {
      let playList = [];
      for (const item of this.listdata) {
        let music = setMusic(item);
        playList.push(music);
      }
      this.changePlayList(playList);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'

.field
  padding 20px
  .play-item
    display flex
    align-items center
    font-size 36px
    height 100px
    border-bottom 1px solid $divider
    box-sizing border-box
    .iconfont
      font-size 40px
    .icon-yinliang
      color $defColor
    .idx
      width 40px
      font-size 28px
      text-align center
    .info
      flex 1
      margin-left 20px
      box-sizing border-box
      .name
        color $titleColor
        font-size 26px
        font-weight 500
        width 580px
        ellipsis()
      .singer
        width 580px
        margin-top 4px
        color $subColor
        font-size 20px
        ellipsis()
    .icon-btn_more
      margin-right -20px
      padding 10px 20px
  .top-item
    margin 0 -20px
    border 1px solid $divider
    border-radius 24px 24px 0 0
    display flex
    justify-content space-between
    box-sizing border-box
    height 80px
    .play-all
      display flex
      flex 1
      height 100%
      align-items center
      padding-left 20px
      border-radius 24px 0 0 0
      .icon-playing
        color $titleColor
        font-weight 500
    .text
      color $titleColor
      font-weight 500
      margin-left 20px
      font-size 26px
      letter-spacing 1px
      .sub-text
        font-size 24px
    .collection
      display flex
      align-items center
      width 160px
      height 100%
      background-color $themeColor
      border-radius 0 24px 0 0
      justify-content center
      .icon-add
        color #ffffff
        font-size 34px
      .text
        color #fff
        margin-left 10px
  .playing
    .info
      .name, .singer
        color $defColor
.popup-info
  color #fff
  width 100%
  height 80px
  line-height 80px
  text-align center
  background-color #2db7f5
</style>
