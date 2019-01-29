<template>
  <div class="play-list">
    <back-nav :title="title"></back-nav>
    <div class="play-list-container">
      <div class="list-info">
        <img
          class="list-img"
          :src="listDetail.coverImgUrl"
          alt=""
        >
        <div class="right">
          <p class="title">{{listDetail.listName}}</p>
          <div class="ar">
            <img
              class="nick-img"
              :src="avatarUrl"
              alt=""
            >
            <p class="nick-name">{{nickname}}</p>
            <icon
              name="arrow-right"
              color="#fff"
              size="sm"
            ></icon>
          </div>
          <ul class="tags">
            <li>#</li>
            <li
              v-for="(tag,idx) in tags"
              :key="idx"
            >{{tag}}</li>
          </ul>
          <div class="operating">
            <div class="operat-item">
              <i class="iconfont icon-tingge"></i>
              <p class="opeart-count">{{listDetail.playCount}}</p>
            </div>
            <div class="operat-item">
              <i class="iconfont icon-pinglun"></i>
              <p class="opeart-count">{{listDetail.commentCount}}</p>
            </div>
            <div class="operat-item">
              <i class="iconfont icon-feiji"></i>
              <p class="opeart-count">{{listDetail.shareCount}}</p>
            </div>
            <div class="operat-item">
              <i class="iconfont icon-comment"></i>
              <p class="opeart-count">{{listDetail.subscribedCount}}</p>
            </div>
          </div>
        </div>
      </div>
      <song-list
        class="song-list"
        :listdata="listDetail.tracks"
      ></song-list>
    </div>
  </div>
</template>

<script>
import { playListDetail } from "@/untils";
import { Icon } from "mand-mobile";
import BackNav from "@/components/BackNav";
import SongList from "@/components/SongList";
import { mapMutations } from "vuex";
export default {
  components: {
    BackNav,
    Icon,
    SongList
  },
  data() {
    return {
      listDetail: {},
      avatarUrl: "",
      nickname: "",
      title: '歌单',
      timer: 0
    };
  },
  computed: {
    tags() {
      let tags = Array.of(this.listDetail.tags);
      return tags.join(".");
    }
  },
  methods: {
    ...mapMutations(['closeLoading']),
    getListDetail() {
      this.axios(`/playlist/detail?id=${this.$route.query.id}`).then(res => {
        this.listDetail = playListDetail(res.data.playlist);
        this.avatarUrl = this.listDetail.creator.avatarUrl;
        this.nickname = this.listDetail.creator.nickname;
        this.closeLoading();
      });
    },
    handleScroll() {   
      let now = Date.now();
      if (now - this.timer > 100) {
        const top = document.documentElement.scrollTop;
        if (top > 200) {
          this.title = `歌单 - ${this.$route.query.title}`;
        }else {
          this.title = '歌单';
        }
        this.timer = now;
      }
    }
  },
  created() {
    // this.title += ` - ${this.$route.query.title}`
    this.getListDetail();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'

.play-list
  .play-list-container
    font-size 28px
    background-color #fff
    .list-info
      width 100%
      padding 40px 20px 100px
      background-color #928ffa
      display flex
      position relative
      box-sizing border-box
      .list-img
        width 220px
        height 220px
        border-radius 16px
        margin-right 20px
      .right
        height 220px
        display flex
        flex-direction column
        justify-content space-around
        .title
          width 430px
          color #fff
        .ar
          display flex
          align-items center
          .nick-img
            width 48px
            height 48px
            border-radius 50%
            margin-right 10px
          .nick-name
            font-size 24px
            color #fff
            margin-right 2px
        .tags
          display flex
          li
            color #fff
            font-size 24px
      .operating
        position absolute
        width 640px
        height 140px
        background-color #fff
        bottom -70px
        left calc(50% - 340px)
        border-radius 8px
        display flex
        justify-content space-around
        align-items center
        box-s()
        .operat-item
          text-align center
          .iconfont
            font-size 60px
            color #928ffa
          .opeart-count
            color #928ffa
    .song-list
      margin-top 70px
</style>