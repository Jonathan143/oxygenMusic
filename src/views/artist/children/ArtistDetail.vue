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
        :list-info="listInfo"
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
      timer: null,
      rgba: 0,
      title: '',
      listInfo: {}
    };
  },
  methods: {
    ...mapMutations(["closeLoading"]),
    getartDetail() {
      this.axios(`artists?id=${this.$route.query.id}`).then(res => {
        this.artistDetail = getArtistDetail(res.data);
        this.closeLoading();
        this.setListInfo();
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
          this.title = this.$route.query.name;
        }else {
          this.rgba = 0;
          this.title = '';
        }
      }, 100);
    },
    setListInfo() {
      this.listInfo = {
        id: this.artistDetail.artist.id,
        picUrl: this.artistDetail.artist.picUrl,
        songName: this.artistDetail.artist.name,
        type: 'artist'
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
.artist-detail-container
  >>>.back-nav-container
    position fixed
    transition all 0.4s
  >>>.field
    padding 0 20px 20px 20px
</style>