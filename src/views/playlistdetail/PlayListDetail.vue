<template>
  <div class="play-list-container">
    <back-nav
      :title="title"
      :style="{backgroundColor: `rgba(146, 143, 250, ${rgba})`}"
    ></back-nav>
      <top-info :list="listDetail"></top-info>
      <song-list
        class="song-list"
        :listdata="listDetail.tracks"
      ></song-list>
  </div>
</template>

<script>
import { playListDetail } from "@/untils";
import { Icon } from "mand-mobile";
import BackNav from "@/components/BackNav";
import SongList from "@/components/SongList";
import TopInfo from "@/components/TopInfo";
import { mapMutations } from "vuex";
export default {
  components: {
    BackNav,
    Icon,
    SongList,
    TopInfo
  },
  data() {
    return {
      listDetail: {},
      title: '歌单',
      timer: null,
      rgba: 0
    };
  },
  methods: {
    ...mapMutations(["closeLoading"]),
    getListDetail() {
      this.axios(`/playlist/detail?id=${this.$route.query.id}`).then(res => {
        this.listDetail = playListDetail(res.data.playlist);
        this.closeLoading();
      });
    },
    handleScroll() {
      let t = this.timer;
      if (t) clearTimeout(t);
      t = setTimeout(()=>{
        const top = document.documentElement.scrollTop;
        if (top > 200) {
          let opacity = top / 400;
          opacity = opacity > 1 ? 1 : opacity;
          this.rgba = opacity;
          this.title = `歌单 - ${this.$route.query.title}`;
        }else {
          this.rgba = 0;
          this.title = '歌单';
        }
      }, 100);
    },
  },
  created() {
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
.play-list-container
  background-color #fff
  .song-list
    margin-top 70px
  >>>.back-nav-container
    position fixed
    transition all 0.4s
</style>