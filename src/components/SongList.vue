<template>
  <div class="song-list">
    <md-field class="field">
      <ul class="play-list">
        <li
          class="play-item ripple"
          v-for="(music,idx) in listdata"
          :key="idx"
          @click="playMusic(music)"
          :class="[playingId == music.id?'playing':'']"
        >
          <i class="iconfont icon-yinliang" v-if="playingId == music.id"></i>
          <p class="idx" v-else>{{idx+1}}</p>
          <div class="info">
            <p class="name">{{music.songName}}</p>
            <p class="singer">{{music.singer}} - {{music.alName}}</p>
          </div>
          <i class="iconfont icon-btn_more" @click.stop="moreOperations"></i>
        </li>
      </ul>
    </md-field>
    <md-popup
      v-model="isPopupShow"
      :hasMask="false"
      position="top"
    >
      <div class="popup-info">
        暂无后续逻辑，更多操作敬请期待
      </div>
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
    [Field.name]: Field,
    [Popup.name]: Popup
  },
  data() {
    return {
      isPopupShow: false
    }
  },
  computed: {
    ...mapState(['playingId'])
  },
  methods: {
    ...mapMutations(["addMusic"]),
    playMusic(music) {
        let playList = setMusic(music);
        this.addMusic(playList);
    },
    moreOperations() {
      this.isPopupShow = true;
      setTimeout(() => {
        this.isPopupShow = false;
      }, 2000);
    }
  },
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
      font-size 36px
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
      padding 10px 20px;
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
  background-color $defColor
</style>