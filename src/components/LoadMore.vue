<template>
  <div
    class="load-more-container"
    :style="{height: cHeight}"
  >
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      :auto-reflow="true"
      @endReached="$_onEndReached"
    >
      <div class="scroll-view-list">
        <div
          class="scroll-view-item"
          v-for="song in list"
          :key="song.id "
          @click="playMusic(song)"
        >
          <div class="bg">
            <img
              class="img"
              v-lazy="song.picUrl"
              alt=""
              :class="{circle:circle}"
            >
            <img
              class="item-img"
              v-lazy="song.picUrl"
              alt=""
              :class="{circle:circle}"
            >
          </div>
          <p
            class="item-title"
            :class="[multi?'multi-ellipsis':'ellipsis']"
          >{{song.songName}}</p>
          <p class="item-sub-title">{{song.singer}}</p>
        </div>
      </div>
      <div class="loading-more">
        <md-activity-indicator
          type="carousel"
          :size="26"
          color="#9025fc"
          v-if="!isFinished"
        ></md-activity-indicator>
        <p
          v-else
          class="carry-out"
        ><i class="iconfont icon-carry-out"></i>已加载全部数据</p>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import { ScrollView, ActivityIndicator } from "mand-mobile";
import { getMusicList, getPlayList, setMusic } from "@/untils";
import { mapMutations, mapState } from "vuex";
export default {
  name: "load-more",
  components: {
    [ScrollView.name]: ScrollView,
    [ActivityIndicator.name]: ActivityIndicator
  },
  props: {
    dataUrl: String,
    multi: {
      type: Boolean,
      default: false
    },
    hasDetails: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      isFinished: false,
      limit: 20,
      musicList: [],
      cHeight: 0
    };
  },
  computed: {
    ...mapState(["isPlayerShow"])
  },
  methods: {
    ...mapMutations(["addMusic", "openLoading", "closeLoading"]),
    playMusic(song) {
      if (this.hasDetails) {
        this.$router.push({
          path: "/playlistdetail",
          query: { id: song.id, title: song.songName }
        });
        this.openLoading();
      } else {
        let playList = setMusic(song);
        this.addMusic(playList);
      }
    },
    $_onEndReached() {
      if (this.isFinished) {
        return;
      }
      if (this.hasDetails) {
        this.axios(this.dataUrl + this.limit).then(res => {
          let items = getPlayList(res.data.playlists);
          if (this.limit > 20) {
            items = items.slice(this.limit - 20, this.limit);
          }
          this.list = [...this.list, ...items];
          this.limit += 20;
          if (this.limit > 200) {
            this.isFinished = true;
          }
          if (this.limit == 40) {
            this.closeLoading();
          }
          this.$refs.scrollView.finishLoadMore();
        });
      } else {
        this.loadMoreMusic();
      }
    },
    getMusicList() {
      this.axios("/top/song?type=0").then(res => {
        this.musicList = getMusicList(res.data.data);
        this.list = this.musicList.slice(0, 20);
        this.limit += 20;
        this.closeLoading();
      });
    },
    loadMoreMusic() {
      let items = this.musicList.slice(this.limit - 20, this.limit);
      this.list = [...this.list, ...items];
      this.limit += 20;
      if (this.limit > 100) {
        this.isFinished = true;
      }
      this.$refs.scrollView.finishLoadMore();
    }
  },
  created() {
    if (this.hasDetails) {
      this.$_onEndReached();
    } else {
      this.getMusicList();
    }
  },
  mounted() {
    let clientHeight = document.documentElement.clientHeight;
    if (this.isPlayerShow) {
      this.cHeight = `calc(${clientHeight}px - 2rem)`;
    } else {
      this.cHeight = `calc(${clientHeight}px - 1rem)`;
    }
  }
};
</script>

<style lang="stylus" scope>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'

.load-more-container
  padding 0 20px
  box-sizing border-box
.scroll-view-list
  display flex
  flex-wrap wrap
  justify-content space-between
  .scroll-view-item
    margin-top 20px
    font-size 22px
    .bg
      position relative
      width 180px
      height 180px
      .item-img
        width 180px
        height 180px
        border-radius 8px
        bg-filter()
      .img
        f-filter()
    .item-title
      width 180px
      margin-top 20px
      color $titleColor
      line-height 36px
      text-align center
    .item-sub-title
      ellipsis()
      width 180px
      font-size 18px
      color $subColor
      text-align center
.loading-more
  margin 20px
  display flex
  justify-content center
  .carry-out
    font-size 28px
    color $defColor
    .iconfont
      font-size 28px
      margin-right 10px
      color $defColor
.multi-ellipsis
  multiEllipsis()
.ellipsis
  ellipsis()
.circle
  border-radius 50% !important
</style>