<template>
  <div class="artist-detail-container">
    <back-nav
      :title="title"
      :style="{backgroundColor: `rgba(146, 143, 250, ${rgba})`}"
    ></back-nav>
    <div class="content">
      <topbg :artinfo="artistDetail.artist"></topbg>
      <song-list
        :listdata="artistDetail.hotSongs"
        ref="box"
      ></song-list>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import BackNav from "@/components/BackNav";
import SongList from "@/components/SongList";
import Topbg from "../components/Topbg";
import { getArtistDetail } from "@/untils";
export default {
  components: {
    BackNav,
    SongList,
    Topbg
  },
  data() {
    return {
      artistDetail: {},
      timer: 0,
      rgba: 0,
      title: ''
    };
  },
  methods: {
    ...mapMutations(["closeLoading"]),
    getartDetail() {
      this.axios(`artists?id=${this.$route.query.id}`).then(res => {
        this.artistDetail = getArtistDetail(res.data);
        this.closeLoading();
      });
    },
    handleScroll() {
      let now = Date.now();
      if (now - this.timer > 100) {
        const top = document.documentElement.scrollTop;
        if (top > 200) {
          let opacity = top / 400;
          opacity = opacity > 1 ? 1 : opacity;
          this.rgba = opacity;
          this.title = this.$route.query.name;
        }else {
          this.rgba = 0;
          this.title = '';
        }
        this.timer = now;
      }
    }
  },
  created() {
    this.getartDetail();
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
>>>.back-nav-container
  position fixed
>>>.field
  padding 0 20px 20px 20px
</style>