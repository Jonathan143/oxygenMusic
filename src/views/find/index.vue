<template>
  <div class="find">
    <div
      class="find__item"
      v-for="(dynamic, index) in dynamicList"
      :key="index"
    >
      <img
        class="item__avatar"
        v-lazy="dynamic.avatarUrl"
        :alt="dynamic.actName"
      />
      <div class="item__content">
        <div class="content__author">
          <p class="author__name">{{ dynamic.actName }}</p>
          <p class="author__reason">{{ dynamic.userReason }}</p>
        </div>
        <p class="content__msg">{{ dynamic.msg }}</p>
        <div class="content__song" v-if="dynamic.state === 'song'">
          <ul class="song__pics">
            <template v-for="(pic, index) in dynamic.pics">
              <li @click="showViewer(index, dynamic.pics)" :key="index">
                <img
                  class="song__pic"
                  :class="{ song__pic2: dynamic.pics.length === 2 }"
                  v-lazy="pic"
                />
              </li>
            </template>
          </ul>
          <div class="song__source" @click="onSongClick(dynamic.source)">
            <div class="song__img-wrap">
              <img
                class="song__img"
                v-lazy="dynamic.source.picUrl"
                :alt="dynamic.source.songName"
              />
              <div class="song__play">
                <md-icon name="rectangle" size="xs" color="#F56C6C"></md-icon>
              </div>
            </div>
            <div class="song__info">
              <p class="song__name">{{ dynamic.source.songName }}</p>
              <p class="song__author">{{ dynamic.source.singer }}</p>
            </div>
          </div>
        </div>
        <div class="content__video" v-if="dynamic.state === 'video'">
          <video
            class="video__player"
            :src="dynamic.source.url"
            controls="controls"
          >
            your browser does not support the video tag
          </video>
        </div>

        <div class="find__operating">
          <i class="iconfont icon-zhuanfa"></i>
          <span class="operating__count">{{ dynamic.forwardCount }}</span>
          <i class="iconfont icon-pinglun1"></i>
          <span class="operating__count">{{ dynamic.commentCount }}</span>
          <i class="iconfont icon-dianzan"></i>
          <span class="operating__count">{{ dynamic.likedCount }}</span>
        </div>
      </div>
    </div>
    <md-image-viewer
      v-model="isViewerShow"
      :list="imgViewList"
      :has-dots="true"
      :initial-index="viewerIndex"
    >
    </md-image-viewer>
  </div>
</template>

<script>
import { ImageViewer, Icon } from 'mand-mobile'
import { mapMutations } from 'vuex'
import { setMusic, lisenMusicAdd } from '@/untils'
export default {
  components: {
    [ImageViewer.name]: ImageViewer,
    [Icon.name]: Icon
  },
  data() {
    return {
      userid: 259801485,
      dynamicList: [],

      isViewerShow: false,
      imgViewList: [],
      viewerIndex: 0
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['ADD_MUSIC']),
    showViewer(index, pics) {
      this.isViewerShow = true
      this.viewerIndex = index
      this.imgViewList = pics
    },

    onSongClick(source) {
      let playList = setMusic(source)
      this.ADD_MUSIC(playList)
      lisenMusicAdd(source)
    },

    reDynamic(api = 'event') {
      this.axios(api)
        .then(data => {
          let event = []

          data.event.forEach(item => {
            const json = JSON.parse(item.json)
            let source = {}
            let state = ''

            if (json.song) {
              state = 'song'
              source = this.setSong(json.song)
            } else if (json.video) {
              state = 'video'
              source = { id: json.video.videoId }
            } else {
              return
            }
            // else if (json.playList) {
            //   state = 'playList'
            //   source = this.setPlayList(json.playList)
            // }

            const pics = item.pics.map(pic => pic.originUrl)
            // console.log(json.msg.split('#'))
            const dynamic = {
              msg: json.msg,
              source: source,
              state: state,
              pics: pics,
              userReason: item.rcmdInfo ? item.rcmdInfo.userReason : '0粉丝',
              actName: item.actName ? item.actName : item.user.nickname,
              avatarUrl: item.user.avatarUrl,
              forwardCount: item.forwardCount ? item.forwardCount : 0, // 转发
              likedCount: item.info.likedCount ? item.info.likedCount : 0, // 点赞
              commentCount: item.info.commentCount ? item.info.commentCount : 0 // 评论
            }
            event.push(dynamic)
            if (json.video) this.reVieoUrl(event.length - 1, dynamic)
          })
          this.dynamicList = event
        })
        .catch(error => {
          this.reDynamic('user/event?uid=1')
          console.log(error)
        })
    },

    reVieoUrl(index, dynamic) {
      this.axios('video/url?id=' + dynamic.source.id).then(data => {
        dynamic.source['url'] = data.urls[0].url
        this.$set(this.dynamicList, index, dynamic)
      })
    },

    setSong(data) {
      const picUrl = `${data.album.picUrl}?param=180y180`
      const song = {
        songName: data.name,
        id: data.id,
        singer: data.artists[0].name,
        picUrl: picUrl,
        alName: data.album.name
      }
      return song
    }

    // setPlayList(data) {
    //   const picUrl = `${data.coverImgUrl}?param=180y180`
    //   const playList = {
    //     songName: data.name,
    //     id: data.id,
    //     picUrl: picUrl
    //   }
    //   return playList
    // }
  },
  mounted() {
    this.reDynamic()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.find {
  &__item {
    padding: 20px;
    border-top: 1px solid #E4E7ED;
    display: flex;

    .item {
      &__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
      }

      &__content {
        flex: 1;
        padding: 0 18px;

        .content {
          &__author {
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .author {
              &__name {
                color: $themeColor;
              }

              &__reason {
                font-size: 20px;
              }
            }
          }

          &__msg {
            line-height: 36px;
            letter-spacing: 1px;
            margin: 6px 0;
          }

          &__song {
            .song {
              &__pics {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              }

              &__pic {
                width: 194px;
                height: 194px;
                object-fit: cover;
                border-radius: 8px;
                margin-top: 4px;
              }

              &__pic2 {
                width: 290px;
                height: 290px;
              }

              &__source {
                display: flex;
                align-items: center;
                padding: 10px;
                background-color: #F2F6FC;
                border-radius: 12px;
                margin-top: 10px;
              }

              &__img {
                width: 70px;
                height: 70px;
                border-radius: 12px;

                &-wrap {
                  position: relative;
                }
              }

              &__play {
                position: absolute;
                top: calc(50% - 15px);
                left: calc(50% - 15px);
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
              }

              &__info {
                height: 70px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                padding-left: 10px;
              }

              &__name {
                font-size: 24px;
                color: $tilteColor;
              }

              &__author {
                font-size: 18px;
                color: #909399;
              }
            }
          }

          &__video {
            margin-top: 10px;

            .video {
              &__player {
                width: 100%;
                height: auto;
              }
            }
          }
        }
      }
    }
  }

  &__operating {
    margin-top: 20px;

    .operating__count {
      margin: 0 60px 0 4px;
    }

    .iconfont {
      font-size: 28px;
    }
  }
}
</style>
