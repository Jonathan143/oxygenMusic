<template>
  <div class="list-detail-container">
    <back-nav :title="title"
      :style="{ backgroundColor: `rgba(146, 143, 250, ${rgba})` }"></back-nav>
    <top-info :list="listDetail"></top-info>
    <song-list class="song-list"
      :listdata="listDetail.tracks"></song-list>
  </div>
</template>

<script>
import { findRankinglistIdx, playListDetail } from '@/untils'
import BackNav from '@/components/backNav'
import SongList from '@/components/songList'
import TopInfo from '@/components/topInfo'
export default {
  components: {
    BackNav,
    TopInfo,
    SongList
  },
  data() {
    return {
      rgba: 0,
      title: '',
      timer: null,
      listDetail: {}
    }
  },
  methods: {
    handleScroll() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop
        if (top > 200) {
          let opacity = top / 400
          opacity = opacity > 1 ? 1 : opacity
          this.rgba = opacity
          this.title = this.$route.query.name
        } else {
          this.rgba = 0
          this.title = ''
        }
      }, 100)
    },
    getList() {
      let idx = findRankinglistIdx(this.$route.query.name)
      this.axios(`top/list?idx=${idx}`).then(res => {
        this.listDetail = playListDetail(res.playlist)
      })
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    window.addEventListener(`scroll`, this.handleScroll)
  },
  destroyed() {
    window.removeEventListener(`scroll`, this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
.list-detail-container {
  background-color: #fff;

  .song-list {
    margin-top: 70px;

    >>>.collection {
      display: none;
    }
  }

  >>>.back-nav-container {
    position: fixed;
    transition: all 0.4s;
  }
}
</style>
