<template>
  <div class="home-container">
    <top-nav></top-nav>
    <div class="content">
      <banner></banner>
      <btn-nav></btn-nav>
      <div class="music-content">
        <scroll-view
          class="scroll-view"
          title="推荐歌单"
          :hasDetails="true"
          :musicData="personalizList"
        ></scroll-view>
        <scroll-view
          class="scroll-view"
          title="新歌速递"
          :musicData="newSong"
          circle
        ></scroll-view>
        <scroll-view
          class="scroll-view"
          title="热门歌单"
          multi
          :hasDetails="true"
          :musicData="hotPlayList"
        ></scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollView from "./components/ScrollView";
import TopNav from "@/components/TopNav";
import Banner from "@/components/Banner";
import BtnNav from "./components/BtnNav";
import { getSongs, getPlayList, getpersonalizList } from "@/untils";
import { mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    ScrollView,
    TopNav,
    Banner,
    BtnNav
  },
  data() {
    return {
      newSong: [],
      personalizList: [],
      hotPlayList: []
    };
  },
  created() {
    this.getNewSong();
    this.getPlList();
    this.getHotPlayList();
  },
  methods: {
    ...mapMutations(['closeLoading']),
    getNewSong() {
      this.axios("personalized/newsong?limit=6").then(res => {
        this.newSong = getSongs(res.data.result).splice(0, 6);
      });
    },
    getPlList() {
      this.axios("personalized").then(res => {
        this.personalizList = getpersonalizList(res.data.result).splice(0, 6);
      });
    },
    getHotPlayList() {
      this.axios("top/playlist?limit=6&order=hot").then(res => {
        this.hotPlayList = getPlayList(res.data.playlists);
        this.closeLoading();
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.home-container
  height 100%
  display flex
  flex-direction column
  .content
    flex 1
    overflow auto
  .scroll-view
    margin-bottom 20px
</style>
