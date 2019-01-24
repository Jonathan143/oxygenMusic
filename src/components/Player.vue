<template>
  <div class="player-container">
    <aplayer
      :audio="playList"
      :lrcType="0"
      :listFolded="true"
      ref="aplayer"
      @listShow="listShow"
      @listAdd="lisenAdd"
      @listSwitch="onPlayingChange"
    />
    <md-popup
      v-model="isListShow"
      position="bottom"
      @hide="listHide"
    >
      <md-popup-title-bar
        class="popup-title-bar"
        @confirm="clearList"
        title="播放列表"
        ok-text="清空 "
        :cancel-text="playType"
      ></md-popup-title-bar>
      <md-field class="field">
        <ul class="play-list">
          <li
            class="play-item"
            :class="[music.id == currentMusic?'playing':'']"
            v-for="(music,idx) in playList"
            :key="idx"
          >
            <i class="iconfont icon-yinliang"></i>
            <p
              class="name"
              @click="changePlay(idx)"
            >
              {{music.name}}
              <span class="singer">- {{music.artist}}</span>
            </p>
            <i
              class="iconfont icon-iconfontclose"
              @click="removeMusic(music.id)"
            ></i>
          </li>
        </ul>
      </md-field>
    </md-popup>
  </div>
</template>

<script>
import { Field, CellItem, Popup, PopupTitleBar } from "mand-mobile";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    "md-popup": Popup,
    "md-popup-title-bar": PopupTitleBar,
    "md-field": Field,
    "md-cell-item": CellItem
  },
  data() {
    return {
      isListShow: false,
      currentMusic: 0
    };
  },
  computed: {
    ...mapState(["playList", "onPlaying", "playingId"]),
    playType() {
      return `列表循环(${this.playList.length})`
    }
  },
  watch: {
    onPlaying() {
      this.$refs.aplayer.switch(this.onPlaying);
    }
  },
  methods: {
    ...mapMutations(["clearPlayList", "delMusic", "changePlayingId"]),
    listShow() {
      this.isListShow = true;
      this.currentMusic = this.$refs.aplayer.currentMusic.id;
    },
    listHide() {
      this.isListShow = false;
      this.$refs.aplayer.hideList();
    },
    clearList() {
      this.$refs.aplayer.pause();
      this.isListShow = false;
      this.$refs.aplayer.hideList();
      this.clearPlayList();
    },
    lisenAdd() {
      this.$refs.aplayer.switch(0);
      this.$refs.aplayer.play();
    },
    changePlay(idx) {
      this.$refs.aplayer.switch(idx);
      this.currentMusic = this.$refs.aplayer.currentMusic.id;
    },
    removeMusic(id) {
      if (this.$refs.aplayer.currentMusic.id == id) {
        this.$refs.aplayer.pause();
      }
      this.delMusic(id);
    },
    onPlayingChange() {
      this.changePlayingId(this.$refs.aplayer.currentMusic.id);
    }
  }
};
</script>

<style lang="stylus">
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'

.player-container
  .aplayer
    .aplayer-pic
      height 100px
      width 100px
      .aplayer-play
        width 36px
        height 36px
        margin 0 -22px -22px 0
        svg
          top 2px
          left 4px
          height 32px
          width 32px
      .aplayer-pause
        width 32px
        height 32px
        bottom 4px
        right 4px
        svg
          top 6px
          left 6px
          height 20px
          width 20px
    .aplayer-info
      margin-left 100px
      height 100px
      box-sizing border-box
      .aplayer-music
        height 40px
        width 500px
        .aplayer-title
          font-size 28px
        .aplayer-author
          font-size 22px
      .aplayer-controller
        margin-top 20px
        .aplayer-bar-wrap .aplayer-bar
          .aplayer-loaded
            height 4px
          .aplayer-played
            background-color rgb(144, 37, 252) !important
            height 4px
            .aplayer-thumb
              height 16px
              width 16px
              top -2px
              background-color rgb(144, 37, 252) !important
        .aplayer-time
          height 40px
          line-height 40px
          font-size 18px
          padding-left 10px
          bottom 16px
          margin-right 72px
          .aplayer-volume-wrap
            display none
    .aplayer-icon
      width 66px
      height 66px
      position absolute
      top -40px
      right -70px
    .aplayer-icon-order
      display none !important
    .aplayer-icon-loop
      display none
    .aplayer-list
      display none !important
  .popup-title-bar
    height 80px
    .title-bar-title
      .title
        font-size 30px !important
        color #303133 !important
    .title-bar-left
      font-size 26px
      letter-spacing 1px
      margin-left: 20px;
    .title-bar-right
      font-size 26px
      color #f56c6c
      letter-spacing 1px
  .field
    padding 20px
    .play-list
      max-height 600px
      overflow-x hidden
      overflow-y scroll
      &::-webkit-scrollbar
        display none
      .play-item
        display flex
        align-items center
        font-size 36px
        height 80px
        border-bottom 1px solid $divider
        .iconfont
          font-size 36px
        .icon-yinliang
          display none
        .name
          flex 1
          margin-left 10px
          ellipsis()
          width 200px
          font-size 26px
          padding-right 40px
        .singer
          margin-left 4px
          font-size 22px
    .playing
      .icon-yinliang, .name, .singer
        color $defColor
      .icon-yinliang
        display block !important
</style>