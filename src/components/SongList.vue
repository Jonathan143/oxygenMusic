<template>
  <div class="song-list">
    <md-field class="field">
      <ul class="play-list">
        <li
          class="play-item"
          v-for="(music,idx) in listdata"
          :key="idx"
          @click="playMusic(music)"
        >
          <i class="iconfont icon-yinliang"></i>
          <p class="idx">{{idx+1}}</p>
          <div class="info">
            <p class="name">{{music.songName}}</p>
            <p class="singer">{{music.singer}} - {{music.alName}}</p>
          </div>
          <i class="iconfont icon-iconfontclose"></i>
        </li>
      </ul>
    </md-field>
  </div>
</template>

<script>
import { Field } from "mand-mobile";
import { mapState, mapMutations } from "vuex";
import { setMusic } from "@/untils";
export default {
  props: {
    listdata: Array
  },
  components: {
    [Field.name]: Field
  },
  methods: {
    ...mapMutations(["addMusic"]),
    playMusic(music) {
        let playList = setMusic(music);
        this.addMusic(playList);
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
      display none
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
        width 600px
        ellipsis()
      .singer
        width 594px
        margin-top 4px
        color $subColor 
        font-size 20px
        ellipsis()
  .playing
    .icon-yinliang, .name, .singer
      color $defColor
    .icon-yinliang
      display block
</style>