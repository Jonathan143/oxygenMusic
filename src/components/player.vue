<template>
  <div class="player-container">
    <aplayer v-if="isRedraw"
      :audio="playList"
      :lrcType="0"
      :listFolded="true"
      ref="aplayer"
      @listShow="listShow"
      @listAdd="lisenAdd"
      @listSwitch="onPlayingChange"
      @play="onPlay" />
    <md-popup v-model="isListShow"
      position="bottom"
      @hide="listHide">
      <md-popup-title-bar class="popup-title-bar"
        @confirm="clearList"
        @cancel="onSwitchPlaybackMode"
        title="播放列表"
        ok-text="清空 "
        :cancel-text="playType"></md-popup-title-bar>
      <md-field class="field">
        <ul class="play-list">
          <li class="play-item"
            :class="[music.id == currentMusic ? 'playing' : '']"
            v-for="(music, idx) in playList"
            :key="idx">
            <i class="iconfont icon-yinliang"></i>
            <p class="name"
              @click="changePlay(idx)">
              {{ music.name }}
              <span class="singer">- {{ music.artist }}</span>
            </p>
            <i class="iconfont icon-iconfontclose"
              @click="removeMusic(music.id)"></i>
          </li>
        </ul>
      </md-field>
    </md-popup>
  </div>
</template>

<script>
import { Field, Popup, PopupTitleBar, Dialog } from 'mand-mobile'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitleBar,
    'md-field': Field
  },
  data() {
    return {
      isListShow: false,
      currentMusic: 0,
      isRedraw: true
    }
  },
  computed: {
    ...mapState(['playList', 'onPlaying', 'playingId']),
    playType() {
      return `循环(${this.playList.length})`
    }
  },
  watch: {
    onPlaying() {
      this.$refs.aplayer.switch(this.onPlaying)
    }
  },
  methods: {
    ...mapMutations([
      'CLEAR_PLAY_LIST',
      'DEL_MUSIC',
      'CHANGE_PLAYING_ID',
      'shuffleModel'
    ]),
    listShow() {
      this.isListShow = true
      this.currentMusic = this.$refs.aplayer.currentMusic.id
    },
    listHide() {
      this.isListShow = false
      this.$refs.aplayer.hideList()
    },
    clearList() {
      Dialog.confirm({
        content: '是否清空播放列表',
        confirmText: '清空',
        onConfirm: () => {
          this.$refs.aplayer.pause()
          this.isListShow = false
          this.$refs.aplayer.hideList()
          this.CLEAR_PLAY_LIST()
        }
      })
    },
    lisenAdd() {
      this.$refs.aplayer.switch(0)
      if (this.playList.length == 1) {
        setTimeout(() => {
          this.$refs.aplayer.play()
        }, 500)
      } else {
        this.$refs.aplayer.play()
      }
    },
    changePlay(idx) {
      this.$refs.aplayer.switch(idx)
      this.currentMusic = this.$refs.aplayer.currentMusic.id
    },
    removeMusic(id) {
      if (this.$refs.aplayer.currentMusic.id == id) {
        this.$refs.aplayer.pause()
      }
      this.DEL_MUSIC(id)
    },
    onPlayingChange() {
      this.currentMusic = this.$refs.aplayer.currentMusic.id
      this.CHANGE_PLAYING_ID(this.$refs.aplayer.currentMusic.id)
    },
    onPlay() {
      // let id = this.$refs.aplayer.currentMusic.id;
      // let list = [];
      // let recebtlyPlayed = localStorage.recebtlyPlayed;
      // if (recebtlyPlayed) {
      //   list = JSON.parse(recebtlyPlayed);
      //   list = removeItem(list, id);
      //   localStorage.setItem('recebtlyPlayed',JSON.stringify(list));
      // }
    },
    onSwitchPlaybackMode() {
      this.shuffleModel()
      this.isRedraw = false

      this.$nextTick(() => {
        this.isRedraw = true
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.player-container {
  .aplayer {
    margin: 0;

    .aplayer-pic {
      height: 100px;
      width: 100px;
      background-color: #fff !important;
      border-radius: 8px;

      .aplayer-play {
        width: 36px;
        height: 36px;
        margin: 0 -22px -22px 0;

        svg {
          top: 2px;
          left: 4px;
          height: 32px;
          width: 32px;
        }
      }

      .aplayer-pause {
        width: 32px;
        height: 32px;
        bottom: 4px;
        right: 4px;

        svg {
          top: 6px;
          left: 6px;
          height: 20px;
          width: 20px;
        }
      }
    }

    .aplayer-info {
      margin-left: 100px;
      height: 100px;
      box-sizing: border-box;

      .aplayer-music {
        height: 40px;
        width: 500px;

        .aplayer-title {
          font-size: 28px;
        }

        .aplayer-author {
          font-size: 22px;
        }
      }

      .aplayer-controller {
        margin-top: 20px;

        .aplayer-bar-wrap .aplayer-bar {
          .aplayer-loaded {
            height: 4px;
          }

          .aplayer-played {
            background-color: rgb(144, 37, 252) !important;
            height: 4px;

            .aplayer-thumb {
              height: 16px;
              width: 16px;
              top: -2px;
              background-color: rgb(144, 37, 252) !important;
            }
          }
        }

        .aplayer-time {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          padding-left: 10px;
          bottom: 16px;
          margin-right: 72px;

          .aplayer-volume-wrap {
            display: none;
          }
        }
      }
    }

    .aplayer-icon {
      width: 66px;
      height: 66px;
      position: absolute;
      top: -40px;
      right: -70px;
    }

    .aplayer-icon-order {
      display: none !important;
    }

    .aplayer-icon-loop {
      display: none;
    }

    .aplayer-list {
      display: none !important;
    }
  }

  .popup-title-bar {
    height: 80px;

    .title-bar-title {
      .title {
        font-size: 30px !important;
        color: #303133 !important;
      }
    }

    .title-bar-left {
      font-size: 26px;
      letter-spacing: 1px;
      margin-left: 20px;
    }

    .title-bar-right {
      font-size: 26px;
      color: #f56c6c;
      letter-spacing: 1px;
    }
  }

  .field {
    padding: 20px;

    .play-list {
      max-height: 600px;
      overflow-x: hidden;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .play-item {
        display: flex;
        align-items: center;
        font-size: 36px;
        height: 80px;
        border-bottom: 1px solid $divider;

        .iconfont {
          font-size: 36px;
        }

        .icon-yinliang {
          display: none;
        }

        .name {
          flex: 1;
          margin-left: 10px;
          ellipsis();
          width: 200px;
          font-size: 26px;
          padding-right: 40px;
        }

        .singer {
          margin-left: 4px;
          font-size: 22px;
        }
      }
    }

    .playing {
      .icon-yinliang, .name, .singer {
        color: $defColor;
      }

      .icon-yinliang {
        display: block !important;
      }
    }
  }
}
</style>
