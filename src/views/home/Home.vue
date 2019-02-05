<template>
  <div class="home-container">
    <div class="content">
      <banner :banner="banner"></banner>
      <btn-nav></btn-nav>
      <div class="music-content">
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
        <scroll-view
          class="scroll-view"
          title="最新歌单"
          multi
          :hasDetails="true"
          :musicData="newPlayList"
        ></scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollView from "./components/ScrollView";
import Banner from "@/components/Banner";
import BtnNav from "./components/BtnNav";
import { getSongs, getPlayList } from "@/untils";
import { mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    ScrollView,
    Banner,
    BtnNav
  },
  data() {
    return {
      current: 'home',
      newSong: [],
      newPlayList: [],
      hotPlayList: [],
      banner: []
    };
  },
  created() {
    this.getBanner();
    this.getNewSong();
    this.getNewPlayList();
    this.getHotPlayList();
  },
  methods: {
    ...mapMutations(['closeLoading', 'changeTopNavCurrent']),
    getNewSong() {
      this.axios("personalized/newsong").then(res => {
        this.newSong = getSongs(res.data.result).splice(0, 6);
      });
    },
    getNewPlayList() {
      this.axios("top/playlist?limit=6&order=new").then(res => {
        this.newPlayList = getPlayList(res.data.playlists);
      });
    },
    getHotPlayList() {
      this.axios("top/playlist?limit=6&order=hot").then(res => {
        this.hotPlayList = getPlayList(res.data.playlists);
        this.closeLoading();
      });
    },
    getBanner() {
      this.axios("banner").then(res => {
        let imgs = [];
        let banner = {};
        for (const item of res.data.banners) {
          banner = {
            imageUrl: item.imageUrl,
            targetId: item.targetId
          };
          imgs.push(banner);
        }
        this.banner = imgs;
      });
    }
  },
  activated() {
    this.changeTopNavCurrent('home');
  },
};
</script>

<style lang="stylus" scoped>
  
</style>
