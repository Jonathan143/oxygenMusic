<template>
  <div class="play-list-container">
    <back-nav :title="title"
      :style="{ backgroundColor: `rgba(146, 143, 250, ${rgba})` }"></back-nav>
    <top-info :list="listDetail"></top-info>
    <song-list class="song-list"
      :listdata="listDetail.tracks"
      :list-info="listInfo"></song-list>
  </div>
</template>

<script>
import { playListDetail } from '@/untils'
import BackNav from '@/components/backNav'
import SongList from '@/components/songList'
import TopInfo from '@/components/topInfo'
export default {
  components: {
    BackNav,
    SongList,
    TopInfo
  },
  data() {
    return {
      listDetail: {},
      title: '歌单',
      timer: null,
      rgba: 0,
      listInfo: {}
    }
  },
  methods: {
    getListDetail() {
      this.axios(`/playlist/detail?id=${this.$route.query.id}`).then(res => {
        this.listDetail = playListDetail(res.playlist)

        this.setListInfo()
      })
    },
    handleScroll() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop

        if (top > 200) {
          let opacity = top / 400
          opacity = opacity > 1 ? 1 : opacity
          this.rgba = opacity
          this.title = `歌单 - ${this.$route.query.title}`
        } else {
          this.rgba = 0
          this.title = `歌单`
        }
      }, 100)
    },
    setListInfo() {
      this.listInfo = {
        id: this.$route.query.id,
        picUrl: this.listDetail.coverImgUrl.slice(5),
        songName: this.listDetail.listName,
        type: 'playlist'
      }
    }
  },
  created() {
    this.getListDetail()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
.play-list-container {
  background-color: #fff;

  .song-list {
    margin-top: 70px;
  }

  >>>.back-nav-container {
    position: fixed;
    transition: all 0.4s;
  }
}
</style>
